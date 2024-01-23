import {useState} from 'react';
import Nav from "../components/Nav"

export default function Onboarding (){
    const [formData, setFormData] = useState({
        user_id: '',
        first_name: '',
        dob_day:'',
        dob_month:'',
        dob_year: '',
        show_gender: false,
        gender_identity: 'man',
        gender_interest: 'woman',
        email: '',
        url: '',
        about:'',
        matches: []
    })
    

    const handleSubmit = () => {
        console.log("submitted");

    }

    const handleChange = (e) => {
       
        const value = e.target.value;
        const name = e.target.name;
        console.log('value'+ value, 'name' + name)

        setFormData(( prevState ) => ({
            ...prevState,
            [name] : value 

        }))

    }
    console.log(formData)
    return (
        <>
            <Nav
                minimal={true}
                setShowModel={() => {}}
                showModel={false}
            />
            <div className="onboarding">
                <h2>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <section>
                        <label htmlFor="first_name">First Name</label>
                            <input 
                                type="text" 
                                id="first_name"
                                name="first_name"
                                placeholder="first name"
                                required={true}
                                value={formData.first_name}
                                onChange={handleChange}
                            />
                            <label>Birthday</label>
                            <div className="multiple-input-container">
                            <input 
                                 type="number" 
                                 id="dob_day"
                                 name="dob_day"
                                 placeholder="DD"
                                 required={true}
                                 value={formData.dob_day}
                                 onChange={handleChange}
                                 />
                            <input 
                                 type="number" 
                                 id="dob_month"
                                 name="dob_month"
                                 placeholder="MM"
                                 required={true}
                                 value={formData.dob_month}
                                 onChange={handleChange}
                                 />
                            <input 
                                 type="number" 
                                 id="dob_year"
                                 name="dob_year"
                                 placeholder="YYYY"
                                 required={true}
                                 value={formData.dob_year}
                                 onChange={handleChange}
                                 />
                            </div>
         
                            <label>Gender</label>
                            <div className="multiple-input-container">
                            <input 
                                type="radio" 
                                id="man-gender-identity"
                                name="gender_identity"
                                value="man"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="man-gender-identity">Man</label>
                             <input 
                                type="radio" 
                                id="woman-gender-identity"
                                name="gender_identity"
                                value="woman"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="woman-gender-identity">Woman</label>
                             <input 
                                type="radio" 
                                id="more-gender-identity"
                                name="gender_identity"
                                value="more"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label htmlFor="more-gender-identity">More</label>
                            </div>
                            <label htmlFor="show-gender">Show gender on my profile</label>
                            <input 
                                type="checkbox" 
                                id="show-gender"
                                name="show_gender"
                                onChange={handleChange}
                                checked={false}
                            />
                            <label>Show Me</label>
                            <div className="multiple-input-container">
                            <input
                                 type="radio" 
                                 id="man-gender-interest"
                                 name="gender_interest"
                                 value="man"
                                 onChange={handleChange}
                                 checked={false}
                             />
                             <label htmlFor="man-gender-interest">Man</label>
                              <input 
                                 type="radio" 
                                 name="gender_interest"
                                 id="woman-gender-interest"                                 
                                 value="woman"
                                 onChange={handleChange}
                                 checked={false}
                             />
                             <label htmlFor="woman-gender-interest">Woman</label>
                              <input 
                                 type="radio" 
                                 name="gender_interest"
                                 id="everyone-gender-interest"                                 
                                 value="everyone"
                                 onChange={handleChange}
                                 checked={false}
                             />
                             <label htmlFor="everyone-gender-interest">Everyone</label>
                         </div>
                         <label htmlFor="about">About Me</label>
                         <input
                             type="text" 
                             name="about"
                             id="about"                                 
                             value={formData.about}
                             required={true}
                             placeholder="I like long walks along the beach..."
                             onChange={handleChange}                        
                             />
                             <input type="submit" /> 
                    </section>
                    <section>
                    <label htmlFor="about">Profile Pic</label>
                        <input
                            type="url"
                            name="url"
                            id="url"
                            onChange={handleChange}
                            required={true}
                            />
                        <div className="photo-container">
                            <img src={formData.url} alt="profile pic preview" />
                    </div>
                    </section>                  
                </form>
            </div>          
        </>
    )
}