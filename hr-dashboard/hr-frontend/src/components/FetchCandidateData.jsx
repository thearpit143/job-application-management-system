import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { candidateAction } from "../store/candidateSlice";
import { fetchStatusAction } from "../store/fetchStatusSlice";

const FetchCandidateData = () => {
  const fetchStatus = useSelector(store => store.fetchStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if(fetchStatus.fetchDone) {
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    dispatch(fetchStatusAction.markFetchingStarted());

    // Fetch all three endpoints in parallel
    Promise.all([
      fetch('http://localhost:5000/api/candidates', {signal})
      .then(res => res.json()),
      fetch('http://localhost:5000/api/approved_candidates', {signal})
      .then(res => res.json()),
      fetch('http://localhost:5000/api/rejected_candidates', {signal})
      .then(res => res.json())
    ])
    .then(([initialData, approvedData, rejectedData]) => {
      dispatch(candidateAction.loadInitialCandidates(initialData.candidates));
      dispatch(candidateAction.loadApprovedCandidates(approvedData.candidates || []));
      dispatch(candidateAction.loadRejectedCandidates(rejectedData.candidates || []));
      dispatch(fetchStatusAction.markFetchDone());
      dispatch(fetchStatusAction.markFetchingFinished());
    })
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error('Fetch error:', error);
        dispatch(fetchStatusAction.markFetchingFinished());
      }
    });

    return () => {
      controller.abort();
    };
  }, [fetchStatus, dispatch]);

  return null;
};

export default FetchCandidateData;