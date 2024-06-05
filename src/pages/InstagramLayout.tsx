import { InstagramLayoutProps } from '../resources/Interface'

const VIDEO_TYPE = 'VIDEO'

const InstagramLayout = ({ imageList }: InstagramLayoutProps) => {
    return (
        <div className='media__container'>
            {imageList.map(image => {
                if (image.mediaType === VIDEO_TYPE) {
                    return (
                        <a
                            href={image.permalink}
                            key={image.permalink}
                            target='_blank'
                            rel='noreferrer'
                        >
                            <video
                                controls
                                muted
                                autoPlay={true}
                                loop
                                controlsList='nodownload nofullscreen noremoteplayback'
                                src={image.mediaUrl}
                                className='media'
                            />
                        </a>
                    )
                }
                return (
                    <a
                        href={image.permalink}
                        key={image.permalink}
                        target='_blank'
                        rel='noreferrer'
                    >
                        <img
                            src={image.mediaUrl}
                            alt='Instagram post from @nail.chimp'
                            className='media'
                        />
                    </a>
                )
            })}
        </div>
    )
}

export default InstagramLayout
