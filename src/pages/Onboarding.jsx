
import Nav from "../components/Nav"

export default function Onboarding (){

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
                                value={""}
                                onChange={handleChange}
                            />
                            <label>Birthday</label>
                            <div className="multiple_input_container">
                            <input 
                                 type="number" 
                                 id="dob_day"
                                 name="dob_day"
                                 placeholder="DD"
                                 required={true}
                                 value={""}
                                 onChange={handleChange}
                                 />
                            <input 
                                 type="number" 
                                 id="dob_month"
                                 name="dob_month"
                                 placeholder="MM"
                                 required={true}
                                 value={""}
                                 onChange={handleChange}
                                 />
                            <input 
                                 type="number" 
                                 id="dob_year"
                                 name="dob_year"
                                 placeholder="YYYY"
                                 required={true}
                                 value={""}
                                 onChange={handleChange}
                                 />
                            </div>
         
                            <label>Gender</label>
                            <div className="multiple_input_container">
                            <input 
                                type="radio" 
                                id="man_gender_identity"
                                name="gender_identity"
                                value={"man"}
                                onChange={handleChange}
                                checked={false}
                            />
                             <input 
                                type="radio" 
                                id="woman_gender_identity"
                                name="gender_identity"
                                value={"woman"}
                                onChange={handleChange}
                                checked={false}
                            />
                             <input 
                                type="radio" 
                                id="more_gender_identity"
                                name="gender_identity"
                                value={"more"}
                                onChange={handleChange}
                                checked={false}
                            />
                            </div>
                    </section>


                </form>
            </div>
           
        </>
    )
}