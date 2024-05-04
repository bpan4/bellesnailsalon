import React from "react";

const VIDEO_TYPE = "VIDEO";

const InstagramLayout = ({ imageList }) => {
    return (
        <div className="media__container">
            {imageList.map((image) => {
                if (image.mediaType === VIDEO_TYPE) {
                    return (
                        <video
                            controls
                            muted
                            autoplay="autoplay"
                            loop
                            controlsList="nodownload nofullscreen noremoteplayback"
                            key={image.permalink}
                            src={image.mediaUrl}
                            alt="Instagram video from @nail.chimp"
                            className="media"
                        />
                    )
                }
                return (
                    <img 
                        key={image.permalink}
                        src={image.mediaUrl} 
                        alt="Instagram post from @nail.chimp"
                        className="media"
                    />
                )
            })}
        </div>
    )
}

export default InstagramLayout;