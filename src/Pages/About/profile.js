import React, { useEffect, useRef, useState } from 'react';
import './about.css';
import Navbar from '../../Component/Navbar/Navbar';
import Picked from '../../Component/pickedtopics/picked'
import Studentsuggetion from '../../Component/studentsuggetion/studentsuggetion';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import Allsuggetions from '../allsuggetions/allsuggetions';
import UploadVideoComponent from '../../Component/uploadvideo/upload'
import Start from '../../Component/courseform/start'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('general');
  const location = useLocation();
const name = location.state ? location.state.name : '';
const email = location.state ? location.state.email : '';


  const [prof, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/fetchprofile')
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const renderContent = () => {




    switch (activeTab) {
      case 'general':
        return <GeneralTabContent name={name} email={email} />;
      case 'EducatorComponent':
        return <EducatorComponent email={email} />;
      case 'StudentComponent':
        return <StudentComponent />;
      case 'Pickedtopics':
        return <Pickedtopics email={email} />;
      case 'Uploadvideo':
        return <Uploadvideo />;
      case 'Uploadcourse':
        return <Uploadcourse />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="account-settings-container">
        <h1 className="account-settings-title">My Profile</h1>

        <div className="account-settings">
          <div className="settings-sidebar">
            <ul className="settings-menu">
              <li
                className={`settings-item ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}>
                General
              </li>

              {prof.filter((item) => item.email === email).map((profile, index) => {
                if (profile.occupation === "Educator") {
                  return (
                    <>
                      <li
                        key={index} // Ensure each list item has a unique key
                        className={`settings-item ${activeTab === 'EducatorComponent' ? 'active' : ''}`}
                        onClick={() => setActiveTab('EducatorComponent')}>
                        All Suggestions
                      </li>
                      <li
                        key={index} // Ensure each list item has a unique key
                        className={`settings-item ${activeTab === 'Pickedtopics' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Pickedtopics')}>
                        Topics which you picked
                      </li>
                      <li
                        key={index} // Ensure each list item has a unique key
                        className={`settings-item ${activeTab === 'Uploadvideo' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Uploadvideo')}>
                        Upload video
                      </li>
                      <li
                        key={index} // Ensure each list item has a unique key
                        className={`settings-item ${activeTab === 'Uploadcourse' ? 'active' : ''}`}
                        onClick={() => setActiveTab('Uploadcourse')}>
                        Upload Course
                      </li>
                    </>
                  );
                } else if (profile.occupation === "Student") {
                  return (
                    <li
                      key={index} // Ensure each list item has a unique key
                      className={`settings-item ${activeTab === 'StudentComponent' ? 'active' : ''}`}
                      onClick={() => setActiveTab('StudentComponent')}>
                      Give Topic Suggestion
                    </li>
                  );
                }
                return null; // Return null for other occupations
              })}
            </ul>
          </div>
          <div className="settings-content">
            {renderContent()}
          </div>
        </div>

      </div>
    </>
  );
};

const GeneralTabContent = ({ name, email }) => {
  const [prof, setProfile] = useState([]);
  // const [image, setImage] = useState("");
  // const [form, setForm] = useState({});
  const [role, setrole] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    axios
      .get('http://localhost:3002/fetchprofile')
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  // const handleImageChange = (e) => {
  //   setImage(e.target.files[0]);
  // }

  const handleSave = async () => {
    try {
      if (email && role && phone) {
        const response = await axios.put('http://localhost:3002/profile', {name, email, role, phone });
        console.log(response);
      } else {
        console.error('Error: email, role, or phone is missing.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  }


  return (
    <div className="settings-content" style={{ width: '900px' }}>
      {/* <div className="user-profile">

        {image ? <img src={URL.createObjectURL(image)} alt="User Avatar" className="user-avatar" />
          : <img src="https://img.freepik.com/free-vector/isolated-young-handsome-man-different-poses-white-background-illustration_632498-859.jpg?size=338&ext=jpg&ga=GA1.1.1395880969.1710201600&semt=ais" alt="User Avatar" className="user-avatar" />
        }
        <div className="profile-actions">
          <label className="btn-upload">
            Upload new photo
            <input type="file" style={{ display: 'none' }} onChange={handleImageChange} className="account-settings-fileinput" />
          </label>
          <p className="file-instructions">Allowed JPG, PNG. Max size of 800K</p>
        </div>
      </div> */}
      <div className="user-details" >
        <div className="form-field">
          <label htmlFor="username">Username</label>
          <input type="text" name="username" placeholder="Enter your username" value={name} />
        </div>
        <div className="form-field">
          <label htmlFor="email">E-mail</label>
          <input type="text" name="email" placeholder="Enter your E-mail address" value={email} />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone Number</label>
          <input type="number" onChange={(e) => { setPhone(e.target.value) }} name="phone" placeholder="Enter your phone number" />
        </div>
        <div className="form-field">
          <label htmlFor="occupation">Occupation</label>
          <input type="text" onChange={(e) => { setrole(e.target.value) }} name="occupation" placeholder="Student/Educator" />
        </div>
      </div>
      <div className="settings-footer">
        <button onClick={handleSave} className="btn-save">Save changes</button>
      </div>
    </div>
  );
};

const EducatorComponent = ({email}) => {
  const [prof, setProfile] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3002/fetchprofile')
      .then((response) => {
        setProfile(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (

    <>
      {prof.filter((item) => item.email === email).map((profile, index) => {
          return (
            <>
              <div className="settings-content" style={{ width: '900px' }}>
                <Allsuggetions email={profile.email} />
              </div>
            </>
          );
      })}
    </>

  );
};


const StudentComponent = () => {
  return (
    <Studentsuggetion />
  );
};

const Pickedtopics = ({email}) => {

  return (
    <>
              <div className="settings-content" style={{ width: '900px' }}>
                <Picked email={email} />
              </div>
      </>
  );
}


const Uploadvideo = () => {
  const[form, setForm] = useState({});

  const handleform = (e) => {
    setForm(prevForm => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  }


  const [fileName, setFileName] = useState('Browse Files');
  const [file, setFile] = useState(null);
  const [secure_url, setsecure_url] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile.name);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file selected");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append('upload_preset', 'videoes_preset');
    try {
      const api = `https://api.cloudinary.com/v1_1/dvy3tlqix/video/upload`;
      const res = await axios.post(api, data);
      const { secure_url } = res.data;
      console.log(secure_url);
      setsecure_url(secure_url);
      alert("Hello")

    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Helloerror")

    }



    try{
      const sendvideo = await  fetch('http://localhost:3002/videoupload', {
        method: 'POST',
        body: JSON.stringify({"videolink": secure_url, "uploadname":form.uploadname, "uploaddes":form.uploaddes, "uploadtime":form.uploadtime}),
        headers: {'Content-Type': 'application/json'},
      });
      if (sendvideo.ok) {
        alert('Your video has been sent successfully');
      } else {
        alert('Failed to send suggestion');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      alert('An error occurred while submitting your suggestion');
    }
  };
  

    return (
      <>
       <div className='start' >
      <div className="container" >
          <form action="#" className="form">
          <p>{JSON.stringify(form)}</p>
            <h1>Details of Your video</h1>
            <div className="input-box">
            <h3>Name of your Topic</h3>
            <input type="text" name='topicname' onChange={handleform} style={{ width: '97%' }} placeholder="Enter the name of your video"  />
            <br />
            <h3>Topic Description</h3>
            <input type="text" name='topicdes' onChange={handleform} style={{ width: '97%' }} placeholder="Enter the description of your promo video" />
            <br />
            <h3>Duretion of Video</h3>
            <input type="number" name='topictime' onChange={handleform} style={{ width: '97%' }} placeholder="hh:mm" />
            <br />
          </div>
            <h3>Upload your video here</h3>
            <label htmlFor="custom-file-upload" className="filupp">
        <span style={{ color: 'white' }} className="filupp-file-name js-value">{fileName}</span>
        <input
          type="file"
          name="attachment-file"
          id="custom-file-upload"
          onChange={handleFileChange}
        />
     </label>
      <br />
      <button style={{backgroundColor:'#1AB79D',paddingInline:'40px',paddingTop:'10px',paddingBottom:'10px',borderRadius:'10px',color:'white'}} onClick={handleUpload}>Upload</button>
          </form>
      </div>
    </div>
      </>
    );
}

const Uploadcourse = () => {
     return (
      <>
      <Start/>
      </>
     );
}

export default Profile;











// const Allsuggetions = () => {
//   // Replace this with actual content
//   // return <div className="settings-content" style={{ width: '900px' }}>

//   //   <div className="user-details">
//   //     <div className="form-field">
//   //       <label for="newpass">New Password</label>
//   //       <input type="password" placeholder='Enter your new password' name="" id="" />
//   //     </div>
//   //     <div className="form-field">
//   //       <label for="conpass">Confirm Password</label>
//   //       <input type="password" placeholder='Enter confirm password' name="" id="" />
//   //     </div>
//   //   </div>

//   //   <div className="settings-footer">
//   //     <button className="btn-save">Save changes</button>
//   //     {/* <button className="btn-cancel">Cancel</button> */}
//   //   </div>
//   // </div>


//   return {prof.occupation=="Educator"?
//   <div className="settings-content" style={{ width: '900px' }}>

//     <div className="user-details">
//       <div className="form-field">
//          <label for="newpass">New Password</label>
//         <input type="password" placeholder='Enter your new password' name="" id="" />
//       </div>
//       <div className="form-field">
//         <label for="conpass">Confirm Password</label>
//         <input type="password" placeholder='Enter confirm password' name="" id="" />
//       </div>
//     </div>

//     <div className="settings-footer">
//       <button className="btn-save">Save changes</button>
//       {/* <button className="btn-cancel">Cancel</button> */}
//     </div>
//   </div> : <h1> You are not allowed to see all suggestion </h1>
//   }
// };










