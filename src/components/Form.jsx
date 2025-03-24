import { useState, useEffect } from "react";
import a1 from '../assets/a1.jpg'
import a2 from '../assets/a2.jpg'

const Form = ({ kods }) => {
  const [willBe, setWillBe] = useState(true);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState([]);

  

  const handleSubmit = async () => {
    // If kods isn't provided, just redirect without sending data
    if (!kods) {
      if (willBe) {
        window.location.href = "/end/pos";
      }else{
        window.location.href = "/end/neg";
      }
      
      return;
    }

    // Prepare data for NocoDB
    const data = {
      Kods: kods,
      Piedalīsies: willBe, // Sending as boolean - NocoDB will handle it
      Komentārs: comment,
      Novērtējums: rating.length > 0 ? parseInt(rating[0].replace("option", "")) : null,
      Tests: true // set to false in production
    };

    try {
      // Post data to NocoDB
      const response = await fetch('https://app.nocodb.com/api/v2/tables/morjpeet8zc37kf/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'xc-token': 'foJHj8GQLp3zR94uyvbHGvMMkhtftSyijvVYl3Je' // Replace with your actual API token
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        
        if (willBe) {
          window.location.href = "/end/pos";
        }else{
          window.location.href = "/end/neg";
        }

      } else {
        console.error('Failed to submit data');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Handle multiple selection in the dropdown
  const handleRatingChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setRating(selectedOptions);
  };

  return (
    <div id="main" className="min-h-dvh w-dvw bg-black relative">
      <div className="">
        <div
          className="z-0 fixed top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${a1.src})` }}>
        </div>
        <div
          className={`z-0 fixed top-0 left-0 w-full h-full bg-cover bg-center transition-opacity ${!willBe ? "opacity-100" : "opacity-0"}`}
          style={{ backgroundImage: `url(${a2.src})` }}>
        </div>
      </div>
     
      <div className="relative z-10 mt-5 flex flex-col gap-3 mx-8 max-w-3xl ">
        <div className="flex justify-evenly text-6xl ">
          <button
            onClick={() => setWillBe(true)}
            className={` cursor-pointer px-4 rounded-sm border-l-[1px] border-r-[1px] ${
              willBe ? " text-yellow-300" : "bg-transparent text-amber-50 border-transparent"
            }`}
          >
            Būšu
          </button>
          <button
            onClick={() => setWillBe(false)}
            className={`text-6xl cursor-pointer px-4 rounded-sm border-l-[1px] border-r-[1px] ${
              !willBe ? " text-yellow-300" : "bg-transparent text-amber-50 border-transparent"
            }`}
          >
            Nebūšu
          </button>
        </div>
        <hr className=" border-amber-50"></hr>
        <p className="text-amber-50 text-2xl"> Gribi man kaut ko pateikt? </p>
        <textarea 
          className=" bg-amber-50/15 backdrop-grayscale-100 h-40 rounded-sm text-amber-50 p-2 italic" 
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        ></textarea>
        <p className="text-amber-50 text-2xl"> Gribi novērtēt ielūgumu? Kā tev patīk?</p>

        <select 
          id="options" 
          className="mt-1 text-amber-50 text-lg  rounded-sm  py-2 open:bg-black/80"
          onChange={handleRatingChange}
          value={rating}
        >
          <option className="py-2 px-1  " value="option5">Ļoti patīk</option>
          <option className="py-2 px-1 " value="option4">Patīk</option>
          <option className="py-2 px-1 " value="option3">Ir ok</option>
          <option className="py-2 px-1 " value="option2">Ne pārāk</option>
          <option className="py-2 px-1 " value="option1">Šausmas</option>
        </select>

        <button 
          className="bg-amber-300 text-4xl w-fit mx-auto px-7 rounded-sm cursor-pointer "
          onClick={handleSubmit}
        >
          nosūtīt
        </button>
      </div>
    </div>
  );
};
 
export default Form; 