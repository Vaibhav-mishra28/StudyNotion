// import { toast } from "react-hot-toast";
// import { studentEndpoints } from "../apis";
// import { apiConnector } from "../apiconnector";
// import rzpLogo from "../../assets/Logo/rzp_logo.png"
// import { setPaymentLoading } from "../../slices/courseSlice";
// import { resetCart } from "../../slices/cartSlice";
// import { getUserDetails } from "./profileAPI";

// const {COURSE_PAYMENT_API, COURSE_VERIFY_API, SEND_PAYMENT_SUCCESS_EMAIL_API} = studentEndpoints;

// function loadScript(src) {
//     return new Promise((resolve) => {
//         const script = document.createElement("script");
//         script.src = src;

//         script.onload = () => {
//             resolve(true);
//         }
//         script.onerror= () =>{
//             resolve(false);
//         }
//         document.body.appendChild(script);
//     })
// }


// export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
//     const toastId = toast.loading("Loading...");
//     try{
//         //load the script
//         const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

//         if(!res) {
//             toast.error("RazorPay SDK failed to load");
//             return;
//         }

//         //initiate the order
//         const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
//                                 {courses},
//                                 {
//                                     Authorization: `Bearer ${token}`,
//                                 })
// console.log("Token in buyCourse:", token);

//         console.log("orderResponse", orderResponse);

//         if(!orderResponse.data.success) {
//             throw new Error(orderResponse.data.message);
//         }
//         console.log("PRINTING orderResponse", orderResponse);
//         //options
//         const options = {
//             key: process.env.REACT_APP_RAZORPAY_KEY,
//             // currency: orderResponse.data.message.currency,
//             // amount: `${orderResponse.data.message.amount}`,
//             // order_id:orderResponse.data.message.id,
//             currency: orderResponse.data.data.currency,
//             amount: `${orderResponse.data.data.amount}`,
//             order_id: orderResponse.data.data.id,

//             name:"StudyNotion",
//             description: "Thank You for Purchasing the Course",
//             image:rzpLogo,
//             prefill: {
//                 name:`${userDetails.firstName}`,
//                 email:userDetails.email
//             },
//             // handler: function(response) {
//             //     //send successful wala mail
//             //     sendPaymentSuccessEmail(response, orderResponse.data.data.amount,token );
//             //     //verifyPayment
//             //     verifyPayment({...response, courses}, token, navigate, dispatch);
//             // }

//             handler: async function(response) {
//                 try {
//                     // Step 1: Verify the payment first
//                     const verifyResponse = await verifyPayment({ ...response, courses }, token, navigate, dispatch);

//                     // Step 2: If payment verification is successful, send success email
//                     if (verifyResponse?.success) {
//                     await sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
//                     } else {
//                     toast.error("Payment verification failed.");
//                     }
//                 } catch (error) {
//                     console.log("ERROR in Razorpay handler:", error);
//                     toast.error("Something went wrong during payment processing.");
//                 }
//             }

//  }
//         console.log("Razorpay Key being sent:", process.env.REACT_APP_RAZORPAY_KEY);

//         //miss hogya tha 
//         const paymentObject = new window.Razorpay(options);
//         paymentObject.open();
//         paymentObject.on("payment.failed", function (response) {
//         toast.error("Oops! Payment failed");
//         console.log("Razorpay Payment Failed:", response.error); // 👈 ADD THIS
// });

//     }
//     catch(error) {
//         console.log("PAYMENT API ERROR.....", error);
//         toast.error("Could not make Payment");
//     }
//     toast.dismiss(toastId);
// }

// async function sendPaymentSuccessEmail(response, amount, token) {
//     try{
//         await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API, {
//             orderId: response.razorpay_order_id,
//             paymentId: response.razorpay_payment_id,
//             amount,
//         },{
//             Authorization: `Bearer ${token}`
//         })
//     }
//     catch(error) {
//         console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
//     }
// }

// //verify payment


// async function verifyPayment(bodyData, token, navigate, dispatch) {
//     const toastId = toast.loading("Verifying Payment....");
//     dispatch(setPaymentLoading(true));
//     let response;
//     try{
//         const response  = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
//             Authorization:`Bearer ${token}`,
//         })

//         if(!response.data.success) {
//             throw new Error(response.data.message);
//         }
//         toast.success("payment Successful, ypou are addded to the course");
//         await dispatch(getUserDetails(token, navigate)); // Refresh user profile after payment success
//         navigate("/dashboard/enrolled-courses");
//         dispatch(resetCart());
//     }   
//     catch(error) {
//         console.log("PAYMENT VERIFY ERROR....", error);
//         toast.error("Could not verify Payment");
//     }
//     toast.dismiss(toastId);
//     dispatch(setPaymentLoading(false));
//     return response.data; // <-- Add this

// }









import { toast } from "react-hot-toast";
import { studentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
import { resetCart } from "../../slices/cartSlice";
import { getUserDetails } from "./profileAPI";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;

    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function buyCourse(token, courses, userDetails, navigate, dispatch) {
  const toastId = toast.loading("Loading...");
  try {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!res) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    const orderResponse = await apiConnector("POST", COURSE_PAYMENT_API, 
      { courses },
      { Authorization: `Bearer ${token}` }
    );

    console.log("orderResponse", orderResponse);

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,

      name: "StudyNotion",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      // ✅ UPDATED: Try-catch and logging inside handler
      handler: async function (response) {
        try {
          console.log("Razorpay Handler Response:", response);
          const verifyData = { 
            ...response,
            courses, // send course IDs
          };
          console.log("VERIFYING WITH DATA:", verifyData);
          await verifyPayment(verifyData, token, navigate, dispatch);
          await sendPaymentSuccessEmail(response, orderResponse.data.data.amount, token);
        } catch (err) {
          console.error("ERROR in Razorpay handler:", err);
          toast.error("Something went wrong during payment verification");
        }
      }
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();

    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment failed");
      console.log("Razorpay Payment Failed:", response.error);
    });

  } catch (error) {
    console.log("PAYMENT API ERROR.....", error);
    toast.error("Could not make Payment");
  }
  toast.dismiss(toastId);
}

async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector("POST", SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

// ✅ FIXED: Improved verifyPayment with better error handling and logging
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  dispatch(setPaymentLoading(true));
  try {
    console.log("SENDING TO VERIFY API:", bodyData); // ✅ log data being sent
    const response = await apiConnector("POST", COURSE_VERIFY_API, bodyData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response?.data?.success) {
      throw new Error(response?.data?.message || "Payment verification failed");
    }

    toast.success("Payment Successful, you are added to the course");
    await dispatch(getUserDetails(token, navigate));
    navigate("/dashboard/enrolled-courses");
    dispatch(resetCart());

    return response.data; // ✅ SAFE: returns only if response exists
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR....", error);
    if (error.response && error.response.data) {
      toast.error(error.response.data.message || "Could not verify payment");
    } else {
      toast.error("Could not verify payment");
    }
    return null;
  } finally {
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
  }
}
