import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react"

// Import Swiper styles
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import "../../App.css"
// Icons
import { FaStar } from "react-icons/fa"
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules"

// Get apiFunction and the endpoint
import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"


const demoReviews = [
  {
    user: {
      firstName: "Alice",
      lastName: "Johnson",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    course: {
      courseName: "Machine Learning Mastery",
    },
    review: "This course was amazing! Learned a lot and the projects were very hands-on.",
    rating: 4.8,
  },
  {
    user: {
      firstName: "Rahul",
      lastName: "Verma",
      image: "https://randomuser.me/api/portraits/men/22.jpg",
    },
    course: {
      courseName: "Web Development Bootcamp",
    },
    review: "Instructors were clear and concise. Would recommend to any beginner.",
    rating: 4.5,
  },
  {
    user: {
      firstName: "Lina",
      lastName: "Park",
      image: "",
    },
    course: {
      courseName: "Intro to Python",
    },
    review: "A very well-structured course. Python basics are now clear to me!",
    rating: 4.7,
  },
  {
    user: {
      firstName: "Anna",
      lastName: "Zhou",
      image: "",
    },
    course: {
      courseName: "Cybersecurity Fundamentals",
    },
    review: "This course covers all the key concepts in a very digestible manner. Great for beginners.",
    rating: 4.4,
  },
  {
    user: {
      firstName: "Tom",
      lastName: "Henderson",
      image: "",
    },
    course: {
      courseName: "UI/UX Design Bootcamp",
    },
    review: "Loved the design challenges and feedback. I feel much more confident with Figma now.",
    rating: 4.6,
  },
  {
    user: {
      firstName: "Priya",
      lastName: "Raj",
      image: "",
    },
    course: {
      courseName: "Cloud Computing with AWS",
    },
    review: "Perfect mix of theory and practical labs. Great course for cloud certification prep.",
    rating: 4.8,
  },
  {
    user: {
      firstName: "Jake",
      lastName: "Miller",
      image: "",
    },
    course: {
      courseName: "AI for Everyone",
    },
    review: "Simple language, great visuals, and awesome real-world examples. Made AI very approachable.",
    rating: 4.9,
  },
]


function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      try{
        const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      // if (data?.success) {
      //   setReviews(data?.data)
      // }

       if (data?.success && data?.data?.length > 0) {
        setReviews(data.data)
      } else {
        setReviews(demoReviews)
      }
    } catch (error) {
      console.error("Error fetching reviews, using demo:", error)
      setReviews(demoReviews)
    }
    })()
  }, [])

  // console.log(reviews)

  return (
    <div className="text-white">
      {/* <div className="my-[50px] h-[184px] max-w-maxContentTab lg:max-w-maxContent"> */}
      <div className="my-10 w-full max-w-7xl mx-auto px-4">

        <Swiper
          slidesPerView={4}
          spaceBetween={25}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews.map((review, i) => {
            return (
              <SwiperSlide key={i} className="!w-[300px]">
                <div className="flex flex-col gap-3 bg-richblack-800 p-3 text-[14px] text-richblack-25">
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        review?.user?.image
                          ? review?.user?.image
                          : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                      }
                      alt=""
                      className="h-9 w-9 rounded-full object-cover"
                    />
                    <div className="flex flex-col">
                      <h1 className="font-semibold text-richblack-5">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                      <h2 className="text-[12px] font-medium text-richblack-500">
                        {review?.course?.courseName}
                      </h2>
                    </div>
                  </div>
                  <p className="font-medium text-richblack-25">
                    {review?.review.split(" ").length > truncateWords
                      ? `${review?.review
                          .split(" ")
                          .slice(0, truncateWords)
                          .join(" ")} ...`
                      : `${review?.review}`}
                  </p>
                  <div className="flex items-center gap-2 ">
                    <h3 className="font-semibold text-yellow-100">
                      {review.rating.toFixed(1)}
                    </h3>
                    <ReactStars
                      count={5}
                      value={review.rating}
                      size={20}
                      edit={false}
                      activeColor="#ffd700"
                      emptyIcon={<FaStar />}
                      fullIcon={<FaStar />}
                    />
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {/* <SwiperSlide>Slide 1</SwiperSlide> */}
        </Swiper>
      </div>
    </div>
  )
}

export default ReviewSlider