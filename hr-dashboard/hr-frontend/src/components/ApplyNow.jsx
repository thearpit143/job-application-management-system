import '../styles/ApplyNow.css';
import { useDispatch } from 'react-redux';
import { useRef, useState } from 'react';
import { candidateAction } from '../store/candidateSlice';
import { fetchStatusAction } from '../store/fetchStatusSlice';
import FormSubmissionMessage from './FormSubmissionMessage';
import LoadingSpinner from './LoadingSpinner';

const ApplyNow = () => {

  const [fileName, setFileName] = useState("Choose File");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const candidateNameElement = useRef();
  const candidateEmailElement = useRef();
  const candidatePhoneNumberElement = useRef();
  const candidateLinkdinElement = useRef();
  const candidatePortfolioElement = useRef();
  const candidateGithubElement = useRef();
  const candidateCollegeElement = useRef();
  const candidateGraduationYearElement = useRef();
  const candidateCityElement = useRef();
  const candidateJobElement = useRef();
  const candidateSkillsElement = useRef();
  const candidateWorkExperienceElement = useRef();
  const candidateCertificationElement = useRef();
  const candidatePitchElement = useRef();
  const candidateResumeElement = useRef();

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", candidateNameElement.current.value);
    formData.append("email", candidateEmailElement.current.value);
    formData.append("phone", candidatePhoneNumberElement.current.value);
    formData.append("linkedin", candidateLinkdinElement.current.value);
    formData.append("portfolio", candidatePortfolioElement.current.value);
    formData.append("github", candidateGithubElement.current.value);
    formData.append("college", candidateCollegeElement.current.value);
    formData.append("graduation_year", candidateGraduationYearElement.current.value);
    formData.append("city", candidateCityElement.current.value);
    formData.append("job", candidateJobElement.current.value);
    formData.append("skills", candidateSkillsElement.current.value);
    formData.append("experience", candidateWorkExperienceElement.current.value);
    formData.append("certifications", candidateCertificationElement.current.value);
    formData.append("pitch", candidatePitchElement.current.value);

    if (candidateResumeElement.current.files.length > 0) {
      formData.append("resume", candidateResumeElement.current.files[0]);
    }

    try {
      const res = await fetch("http://localhost:5000/api/candidates", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        dispatch(candidateAction.addCandidate(data.candidate));
        dispatch(fetchStatusAction.resetFetchStatus());
        setSubmissionStatus("success");
      } else {
        setSubmissionStatus("error");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmissionStatus("error");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (submissionStatus) {
    return (
      <FormSubmissionMessage
        success={submissionStatus === "success"}
      />
    );
  }

  return (
    <div className="apply-now-container">
      <h2>Apply for Your Dream Job</h2>
      <form className="apply-now-form" onSubmit={handleSubmit}>

        <label>
          Full Name:
          <input ref={candidateNameElement} type="text" name="name" required minLength={3} />
        </label>

        <label>
          Email Address:
          <input ref={candidateEmailElement} type="email" name="email" required />
        </label>

        <label>
          Phone Number:
          <input ref={candidatePhoneNumberElement} type="tel" name="phone" required pattern="[0-9]{10}" />
        </label>

        <label>
          LinkedIn Profile:
          <input ref={candidateLinkdinElement} type="url" name="linkedin" />
        </label>

        <label>
          Portfolio / Website:
          <input ref={candidatePortfolioElement} type="url" name="portfolio" />
        </label>

        <label>
          GitHub Profile:
          <input ref={candidateGithubElement} type="url" name="github" />
        </label>

        <label>
          College/University:
          <input ref={candidateCollegeElement} type="text" name="college" required />
        </label>

        <label>
          Graduation Year:
          <select
            ref={candidateGraduationYearElement}
            name="graduation_year"
            defaultValue={2025}
            required
          >
            {Array.from({ length: 100 }, (_, i) => {
              const year = new Date().getFullYear() + i - 50;
              return <option key={year} value={year}>{year}</option>;
            })}
          </select>
        </label>

        <label>
          City:
          <input ref={candidateCityElement} type='text' name="city" required></input>
        </label>

        <label>
          Job:
          <select name="job" required ref={candidateJobElement}>
            <option value="">-- Select your Job --</option>
            <option value="Software Engineer">Software Engg</option>
            <option value="UX Designer">UX</option>
            <option value="UI Designer">UI</option>
            <option value="Full Stack Developer">Full Stack</option>
            <option value="Product Manager">Product Manager</option>
            <option value="QA Engineer">QA Engineer</option>
          </select>
        </label>

        <label>
          Skills:
          <input ref={candidateSkillsElement} type="text" name="skills" required />
        </label>

        <label>
          Work Experience:
          <textarea ref={candidateWorkExperienceElement} name="experience"></textarea>
        </label>

        <label>
          Certifications:
          <textarea ref={candidateCertificationElement} name="certifications"></textarea>
        </label>

        <label>
          Why Should We Hire You?
          <textarea ref={candidatePitchElement} name="pitch" required minLength={30}></textarea>
        </label>

        <label className="custom-file-label">
          Upload Resume:
          <div className="file-upload-wrapper">
            <input
              ref={candidateResumeElement}
              type="file"
              name="resume"
              required
              accept=".pdf,.doc,.docx"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  setFileName(e.target.files[0].name);
                } else {
                  setFileName("Choose File");
                }
              }}
            />
            <span className='choose-file-class'>{fileName}</span>
          </div>
        </label>

        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default ApplyNow;
