import React, {useRef} from "react";

import projectsJSON from "../projects_obj";

import { useParams } from "react-router-dom";

import "./mainpages_styles.css"; 


export default function ProjectPages() {
    const {id} = useParams();
    const imgWrapRefs = useRef([]);

    const selectedProject = Object.values(projectsJSON).find(proj => proj.id === id);

    const {Color, Title, date, Skills, Description, Images, Video } = selectedProject;

    if (!selectedProject) {
        // Handle the case where selectedResearch is undefined
        return <div>Research not found</div>;
    }

    const descriptionWithLineBreaks = Description.split('\n').map((line, index) => (
        <React.Fragment key={index}>
            {line}
            <br />
        </React.Fragment>
    ));


    const handleImageLoad = (index) => {
      return () => {
        const img = imgWrapRefs.current[index].querySelector('img');
        if (img) {
          const { width, height } = img;
          imgWrapRefs.current[index].querySelector('.overlay').style.width = `${width}px`;
          imgWrapRefs.current[index].querySelector('.overlay').style.height = `${height}px`;
        }
      };
    };

    function imageUpload() {
        if (Object.keys(Images).length !== 0) {
        return(
            Object.entries(Images).map(([src, desc], index) => (
                
                <div className={`${id}${index}`} key={index} ref={(el) => (imgWrapRefs.current[index] = el)}>
                    <img key = {index} src={src} className={`${id}${index}img`}alt = "Images of project" onLoad={handleImageLoad(index)}/>
                    <div className="overlay" style={{ backgroundColor: Color }}>
                        <div className="context" style={{ Color: Color }}> {desc} </div>
                    </div>
                </div>
            ))
            )
        } else {
            return null;
        }
    };

    function videoUpload() {
        if (Video && Video.length !== 0) {
        return(
            Video.map((vid, index) => (
                <span className={`${id}${index}vid`}>
                <iframe className = "video" width="750" height="500"
                        src= {vid}
                        title = "Project video"
                        allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen> 
                </iframe>
                </span>
            ))
        )} else {
            return null;
        }
    };

    return (
        <div> 
            <div className="title">
                <h1 className = "Title" style={{ color: Color }}> {Title} </h1>
                <h2 className = "ProjectDate" style={{ color: Color }}> {date} </h2>
                <hr />
            </div> 

            <div className="body">
                <span className = "sectionTitle" style={{ color: Color }}> About </span>
                <span className = "sectionText"> <p className="desc"> {descriptionWithLineBreaks}  </p></span>
            </div>

            <div className="body">
                <span className = "sectionTitle" style={{ color: Color }}> Key Skills </span>
                <span> <ul className = "skillsList"> 
                    {Skills.map((skill, index) => (
                        <li key={index} className="listItem">{skill}</li>
                    ))}
                </ul></span>
            </div>

            <div className="imagesAndVids"> 
                {imageUpload()}
                {videoUpload()}
            </div>

        </div>
    )
}