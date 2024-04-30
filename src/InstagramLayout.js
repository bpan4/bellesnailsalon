import React from "react";

const IMAGE_TYPE = "IMAGE";
const VIDEO_TYPE = "VIDEO";
const CAROUSEL_TYPE = "CAROUSEL_ALBUM"

const InstagramLayout = ({ imageList }) => {
    return (
        <div>
            {imageList.map((image) => {
                if (image.mediaType === VIDEO_TYPE) {
                    return (
                        <video 
                            src={image.mediaUrl}
                            height={"50px"}
                            width={"50px"}
                        />
                    )
                }
                return (
                    <img 
                        src={image.mediaUrl} 
                        height={"50px"}
                        width={"50px"}
                    />
                )
            })}
        </div>
    )
}

export default InstagramLayout;