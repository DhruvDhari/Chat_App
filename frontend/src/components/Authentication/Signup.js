import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from "axios";
import { useHistory } from "react-router-dom";


const Signup = () => {
    const [show1,setShow1]=useState(false);
    const [show2,setShow2]=useState(false);
    const [name,setName]= useState();
    const [email,setEmail]= useState();
    const [confirmpassword,setConfirmpassword]= useState();
    const [password,setPassword]= useState();
    const [pic,setPic]= useState();
    const [loading,setLoading]= useState(false);
    const toast = useToast();
    const history = useHistory();
    

    const handleClick1=()=>{
        setShow1(!show1);
    }
    const handleClick2=()=>{
        setShow2(!show2);
    }

    const postDetails=(pics)=>{
        setLoading(true);
        
        if(pics===undefined){
            toast({
                title:"PLease Select an Image!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'bottom'
            });
            return;
        }
        
        if(pics.type==="image/jpeg" || pics.type ==="image/png"){
            const data = new FormData();
            data.append("file",pics);
            data.append("upload_preset","chat-app");
            data.append("cloud_name","dcswinzu2");
           
           
            fetch("https://api.cloudinary.com/v1_1/dcswinzu2/image/upload",{
                method:"post",
                body:data,

            }).then((res)=>res.json())
            .then(data =>{
                setPic(data.url.toString());
                setLoading(false);
            })
            .catch((err)=>{
                console.log(err);
                setLoading(false);
            })
            
        }else{
            toast({
                title:"PLease Select an Image!",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'bottom'
            });
            setLoading(false);
            return;
        }

    }

    const submitHandler=async()=>{
        setLoading(true);
        if(!name || !email || !password ||!confirmpassword){
            toast({
                title:"PLease Fill all the Fields",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'bottom'
            });
      
            setLoading(false);
            return;
        }
        if(password !==confirmpassword){
            toast({
                title:"Passwords Do Not Match",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:'bottom'
            });
            setLoading(false);
            return;
    }

    try {
        const config = {
          headers: {
            "Content-type": "application/json"
          },
        };
        const { data } = await axios.post(
          "/api/user",
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
       
        toast({
          title: "Registration Successful",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        localStorage.setItem("userInfo", JSON.stringify(data));
        setLoading(false);
        history.push("/chats");
      } catch (error) {
        toast({
          title: "Error Occured!",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom",
        });
        setLoading(false);
      }
}


  return (
    <VStack spacing='5px' color='black'>
        <FormControl id='first-name' isRequired>
            <FormLabel>
                Name
            </FormLabel>
            <Input 
            placeholder='Enter Your Name'
            onChange={(e)=>{
                setName(e.target.value)
            }} />
        </FormControl>
        <FormControl id='email' isRequired>
            <FormLabel>
                Email
            </FormLabel>
            <Input 
            placeholder='Enter Your Email'
            onChange={(e)=>{
                setEmail(e.target.value)
            }} />
        </FormControl>

        <FormControl id='password' isRequired>
            <FormLabel>
                Password
            </FormLabel>
            <InputGroup>
            
            <Input 
            type={show1?'text':'password'}
            placeholder='Enter Your Password'
            onChange={(e)=>{
                setPassword(e.target.value)
            }} />
            <InputRightElement width="4.5rem" >
            <Button h="1.75rem" size="sm" onClick={handleClick1}>
                {show1?"Hide":"Show"}
            </Button>
            </InputRightElement>
            </InputGroup>

        </FormControl>
        <FormControl id='confirm-password' isRequired>
            <FormLabel>
                Confirm Password
            </FormLabel>
            <InputGroup>
            
            <Input 
            type={show2?'text':'password'}
            placeholder='Confirm Password'
            onChange={(e)=>{
                setConfirmpassword(e.target.value)
            }} />
            <InputRightElement width="4.5rem" >
            <Button h="1.75rem" size="sm" onClick={handleClick2}>
                {show2?"Hide":"Show"}
            </Button>
            </InputRightElement>
            </InputGroup>

        </FormControl>
      
        <FormControl id='pic' >
            <FormLabel>
                Upload your Picture
            </FormLabel>
            <Input 
            type='file'
            p={1.5}
            accept='image/*'
           
            onChange={(e)=>{
                postDetails(e.target.files[0])
            }} />
        </FormControl>
        <Button 
        colorScheme='gray'
        width="100%"
        style={{marginTop:15}}
        onClick={submitHandler}
        isLoading={loading}
        >
            Sign Up
        </Button>
    </VStack>
  )
}

export default Signup