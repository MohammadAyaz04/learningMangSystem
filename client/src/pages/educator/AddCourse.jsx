import React from 'react'
import uniqid from 'uniqid'
import Quill from 'quill'
import { AppContext } from '../../context/AppContext';
import { useState,useEffect,useRef } from 'react';
import {assets} from '../../assets/assets';
import {useNavigate} from 'react-router-dom';

const AddCourse = () => {

  const quillRef=useRef(null);
  const editorRef=useRef(null);

  const [courseTitle,setCourseTitle]=useState('');
  const [coursePrice,setCoursePrice]=useState(0);
  const [discount,setDiscount]=useState(0);
  const [image,setImage]=useState(null);
  const [chapters,setChapters]=useState([])
const [showPopup,setShowPopup]=useState(false);
const [currentChapterId,setCurrentChapterId]=useState(null)
const [lectureDetails,setLectureDetails]=useState({

  lectureTitle:'',
  lectureDuration:'',
  lectureUrl:' ',
  isPreviewFree:false
  
})

/**Quill is not a React library — it needs a real DOM node to mount itself on. Without editorRef, you have no way to pass that <div> to Quill.
 * editorRef is just a useRef being used to grab a real DOM element.
 * When React renders your component, that <div> exists. 
 * So inside useEffect, editorRef.current correctly points to the DOM element where Quill should attach itself. 
 * useRef uses - 1. Access DOM elements directly 2. Store a value without triggering re-render
 */

/*/*User clicks uplpoad icon
      ↓
label triggers hidden input
      ↓
File picker opens
      ↓
User selects image
      ↓
setImage(file) → stored in state
      ↓
URL.createObjectURL(image) → preview appears */ 

const handleChapter=(action,chapterId)=>{
  if(action==='add'){
    const title=prompt('Enter Chapter Name:')
    if(title){
      const newChapter={
        chapterId:uniqid(),
        chapterTitle:title,
        chapterContent:[],
        collapsed:false,
        chapterOrder: chapters.length>0?chapters.slice(-1)[0].chapterOrder+ 1:1,
      }
      setChapters([...chapters,newChapter])
    }
  }
  else if(action==='remove'){
    setChapters(chapters.filter((chapter)=>chapter.chapterId !== chapterId))
  } else if(action=='toggle'){
    setChapters(
      chapters.map((chapter)=>
        chapter.chapterId==chapterId ? {...chapter,collapsed: !chapter.collapsed} : chapter))
  }
}
 const handleLecture=(action,chapterId,lectureIndex)=>{
  if(action === 'add'){
    setCurrentChapterId(chapterId)
    setShowPopup(true)
  }
  else if(action==='remove'){
    setChapters(chapters.map((chapter)=>{
      if(chapter.chapterId === chapterId){
      chapter.chapterContent.splice(lectureIndex,1)
    }
      return chapter;   
    })
    )

 }
}


const addLecture = () => {
  setChapters(chapters.map((chapter) => {
    if (chapter.chapterId === currentChapterId) {
      const newLecture={
        ...lectureDetails,
        lectureOrder: chapter.chapterContent.length>0?chapter.chapterContent.slice(-1)[0].lectureOrder +1:1 ,
        lectureId:uniqid(),
      }
     chapter.chapterContent.push(newLecture)
    }
    return chapter;
  }))
  setShowPopup(false)
  setLectureDetails({
    lectureTitle: '',
    lectureDuration: '',
    lectureUrl: '',
    isPreviewFree: false
  })
} 

 const handleSubmit=async(e)=>{
  e.preventDefault()
  if(quillRef.current.root.innerHTML==='<p></p>'){
    alert('Please add course description')
    return
  }
  const formData=new FormData()

 }


useEffect(()=>{
  if(!quillRef.current && editorRef.current){
    quillRef.current=new Quill(editorRef.current,{theme:'snow'})
  }
},[])

return (
  <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0'>
    <form  onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md w-full text-gray-500'>

      <div className='flex flex-col gap-1'>
        <p>Course Title</p>
        <input
          onChange={e => setCourseTitle(e.target.value)}
          value={courseTitle}
          type="text"
          placeholder='Type here'
          className='outline-none md:py-2.5 py-2 px-3 rounded border border-gray-500'
          required
        />
      </div>

      <div className='flex flex-col gap-1'>
        <p>Course Description</p>
        <div ref={editorRef}></div>
      </div>
<div className='flex items-center justify-between flex-wrap'>
  <div className='flex flex-col gap-1'>
    <p>Course Price</p>
    <input
      onChange={e => setCoursePrice(e.target.value)}
      value={coursePrice}
      type='number'
      placeholder='0'
      className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500'
      required
    />
  </div>
  <div className='flex md:flex-row flex-col items-center gap-3'>
    <p>Course Thumbnail</p>
    <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
      <img
        src={assets.file_upload_icon}
        alt=""
        className='p-3 bg-blue-500 rounded'
      />
      <input
        type="file"
        id='thumbnailImage'
        onChange={e => setImage(e.target.files[0])}
        accept="image/*"
        hidden
      />
     {image && <img className='max-h-10' src={URL.createObjectURL(image)} alt="" />}
    </label>
  </div>
</div>
<div>
  

  <p>Discount %</p>
  <input type="number" placeholder='0' min={0} max={100} onChange={e=>setDiscount(e.target.value)} value={discount} className='outline-none md:py-2.5 py-2 w-28 px-3 rounded border border-gray-500' required/>
</div>
{/*Adding Chapters & lectures */}
<div>
  {chapters.map((chapter,chapterIndex)=>(
    <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
      <div className='flex justify-between items-center p-4 border-b'>
        <div className='flex items-center'>
          <img onClick={()=> handleChapter('toggle',chapter.chapterId)}
          src={assets.dropdown_icon} width={14} alt="" className={`mr-2 cursor-pointer transition-all ${chapter.collapsed && "-rotate-90"}`}/>
          <span className='font-semibold'>Chapter {chapterIndex +1 } {chapter.chapterTitle}</span>
        </div>
        <span className='text-gray-500'>{chapter.chapterContent.length} Lectures</span>
        <img onClick={()=> handleChapter('remove',chapter.chapterId)} src={assets.cross_icon} alt="" className='cursor-pointer'/>
      </div>

      {/*Chapter Content*/}
      {!chapter.collapsed &&(
        <div className='p-4'>
          {chapter.chapterContent.map((lecture,lectureIndex)=>(    
        <div key={lectureIndex} className='flex justify-between items-center mb-2'>
        <span>{lectureIndex + 1} {lecture.lectureTitle} - {lecture.lectureDuration} mins - <a href={lecture.lectureUrl} target="_blank" className='text-blue-500'>Link</a> - {lecture.isPreviewFree ? 'Free Preview' : 'Paid'}</span>

          <img
            src={assets.cross_icon}
            alt=""
            className='cursor-pointer'
            onClick={()=>handleLecture('remove',chapter.chapterId,lectureIndex)} />
        </div>
        ))}
        <div className='inline-flex bg-gray-100 p-2 rounded cursor-pointer mt-2' onClick={()=> handleLecture('add',chapter.chapterId)}>
          + Add Lecture
        </div>
        </div>
        )}
        </div>
        ))}
        <div className='flex justify-center items-center bg-blue-100 p-2 rounded-lg cursor-pointer' onClick={()=>handleChapter('add')}>
          + Add Chapter
        </div>

        {/**Lecture popup */}

       {showPopup && (
  <div className='fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-sm'>
    <div className='bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden'>
      
      {/* Header */}
      <div className='flex items-center justify-between px-6 py-4 border-b bg-gradient-to-r from-blue-500 to-blue-600'>
        <h2 className='text-lg font-semibold text-white tracking-wide'>Add Lecture</h2>
        <button
          onClick={() => setShowPopup(false)}
          className='text-white/80 hover:text-white text-2xl leading-none'
        >
          &times;
        </button>
      </div>

      {/* Body */}
      <div className='px-6 py-5 flex flex-col gap-4'>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-600'>Lecture Title</label>
          <input
            type="text"
            placeholder='e.g. Introduction to React'
            value={lectureDetails.lectureTitle}
            onChange={e => setLectureDetails({...lectureDetails, lectureTitle: e.target.value})}
            className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-600'>Duration (minutes)</label>
          <input
            type="number"
            placeholder='e.g. 15'
            value={lectureDetails.lectureDuration}
            onChange={e => setLectureDetails({...lectureDetails, lectureDuration: e.target.value})}
            className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium text-gray-600'>Lecture URL</label>
          <input
            type="text"
            placeholder='https://youtube.com/...'
            value={lectureDetails.lectureUrl}
            onChange={e => setLectureDetails({...lectureDetails, lectureUrl: e.target.value})}
            className='border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition'
          />
        </div>

        <div className='flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 border border-gray-200'>
          <span className='text-sm font-medium text-gray-600'>Free Preview?</span>
          <label className='relative inline-flex items-center cursor-pointer'>
            <input
              type="checkbox"
              checked={lectureDetails.isPreviewFree}
              onChange={e => setLectureDetails({...lectureDetails, isPreviewFree: e.target.checked})}
              className='sr-only peer'
            />
            <div className="w-10 h-5 bg-gray-300 peer-checked:bg-blue-500 rounded-full transition-all after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:after:translate-x-5"></div>
          </label>
        </div>

      </div>

      {/* Footer */}
      <div className='px-6 pb-6 flex gap-3'>
        <button
          onClick={() => setShowPopup(false)}
          className='flex-1 border border-gray-300 text-gray-600 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition'
        >
          Cancel
        </button>
        <button
          onClick={addLecture}
          className='flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-semibold transition'
        >
          Add Lecture
        </button>
      </div>

    </div>
  </div>
)}
        
          <button type='submit' className='bg-black text-white w-max py-2.5 px-8 rounded my-4'>ADD</button>
        
        </div>

   </form>

   </div>
   )
 }

export default AddCourse