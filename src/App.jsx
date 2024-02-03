import { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const [apiResponse, setApiResponse] = useState();
  const [username, setUsername] = useState('');
  const [cidr,setCidr] = useState([]);

  const handleCidrChange = (index, value) => {
    setCidr((prevData) => {
      const newData = [...prevData];
      newData[index].CidrIpv4 = value;
      return newData;
    });
  };
  const addElementdata=(item)=>{
    setCidr((prevData)=>
    [
      ...prevData,
      { SecurityGroupRuleId: item.SecurityGroupRuleId, CidrIpv4: item.CidrIpv4 },
    ])
  };

  const createElement = (item, index) => {
    console.log(item);

    return (
      <div className="elementRender" key={item.SecurityGroupRuleId}>
        <p>{item.SecurityGroupRuleId}</p>
        <input key={item.SecurityGroupRuleId} type="text" value={item.CidrIpv4} onChange={(e) => handleCidrChange(index, e.target.value)}/>
        <button onClick={()=>updateClick(item.SecurityGroupRuleId, index)}>Update</button>
      </div>
    );
  };
  const updateClick = async (SecurityGroupRuleId, index) =>{
    try{
    const response = await fetch("https://kh6ky6kyotubjuvgqyo633bqy40hcbjb.lambda-url.us-east-1.on.aws/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ "cidr":cidr[index].CidrIpv4, "security": SecurityGroupRuleId }),
      });
      const data = await response.json();
      if ((data !== null || undefined) && (!data.body?.error)) {
        toast.success("Updated",{
          position: 'bottom-right',
          autoClose: 5000, // Time in milliseconds before the notification auto-closes
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
      else{
        throw new Error(data.body.error)
      };

      // Update the state with the API response
      
    } catch (error) {
      console.error("Error fetching API:", error);
      toast.error(error.message , {
        position: 'bottom-right',
        autoClose: 5000, // Time in milliseconds before the notification auto-closes
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
}
  const handleClick = async () => {
    try {
      // Make an API call here
      cidr !==null && setCidr([])
      const response = await fetch("https://tvgqjc23ddn56hdqspqj2t2uwm0eidtv.lambda-url.us-east-1.on.aws/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });
      const data = await response.json();
      if (data.SecurityGroupRules.length === 0 ) {
        throw new Error("No such user found");
      }
      // Update the state with the API response
      setApiResponse(data.SecurityGroupRules);
      data.SecurityGroupRules.forEach((item) => addElementdata(item));
    } catch (error) {
      console.error("Error fetching API:", error);
      toast.error(error.message , {
        position: 'bottom-right',
        autoClose: 5000, // Time in milliseconds before the notification auto-closes
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      
      <input type="text" placeholder="Enter username" value={username}
        onChange={(e) => setUsername(e.target.value)}/>
      <button onClick={handleClick}>Submit</button>
      {console.log(cidr)}
      {apiResponse!==undefined && cidr.map((item,index)=>createElement(item,index))}
      <div><ToastContainer/></div>
    </>
  );
}

export default App;
