import React from "react";

const VIDEO_TYPE = "VIDEO";

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
                            alt="Instagram video from @nail.chimp"
                        />
                    )
                }
                return (
                    <img 
                        src={image.mediaUrl} 
                        height={"50px"}
                        width={"50px"}
                        alt="Instagram post from @nail.chimp"
                    />
                )
            })}
        </div>
    )
}

export default InstagramLayout;