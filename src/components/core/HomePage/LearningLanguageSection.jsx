import React from 'react'
import HighlightText from './HighlightText'
import CTAButton from "../../../components/core/HomePage/Button";
import Know_your_progress from "../../../assets/Images/Know_your_progress.png";
import Compare_with_others from "../../../assets/Images/Compare_with_others.svg";
import Plan_your_lessons from "../../../assets/Images/Plan_your_lessons.svg";

const LearningLanguageSection = () => {
  return (
    <div className='mt-[130px] mb-32'>
        <div className='flex flex-col gap-5 items-center '>
            <div className='text-4xl font-semibold text-center'>
                Your Swiss Knife for 
                <HighlightText text={"learning any language"}/>
            </div>
            <div className='text-center text-richblack-600 mx-auto text-base font-medium w-[70%]'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
            progress tracking, custom schedule and more.
            </div>

            <div className='flex flex-row flex-nowrap items-center justify-center mt-5 overflow-visible'>
            <img
                src={Know_your_progress}
                alt="Know your progress"
                className="object-contain shrink-0 w-28 sm:w-36 md:w-44 lg:w-auto -mr-8 md:-mr-20 lg:-mr-32"
              />
              <img
                src={Compare_with_others}
                alt="Compare with others"
                className="object-contain shrink-0 w-28 sm:w-36 md:w-44 lg:w-auto -mt-4 md:-mt-6 lg:-mt-0 lg:-mb-10"
              />
              <img
                src={Plan_your_lessons}
                alt="Plan your lessons"
                className="object-contain shrink-0 w-28 sm:w-36 md:w-44 lg:w-auto -ml-6 md:-ml-16 lg:-ml-36 -mt-6 md:-mt-10 lg:-mt-5"
              />
            </div>

            <div className="w-fit mx-auto lg:mb-20 mb-8 -mt-5">
            <CTAButton active={true} linkto={"/signup"}>
              <div className="">Learn More</div>
            </CTAButton>
          </div>

        </div>
    </div>
  )
}

export default LearningLanguageSection