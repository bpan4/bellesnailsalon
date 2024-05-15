import { useEffect, useState } from "react";
import InstagramLayout from "./InstagramLayout";
import { InstaItem } from "../resources/Interface";

const InstagramItems = () => {

    // stores images from Instagram API
    const [imageList, setImageList] : [InstaItem[], Function] = useState([]);

    useEffect(() => {
        // params needed to query the Instagram API
        const userId = import.meta.env.VITE_USER_ID;
        const accessToken = import.meta.env.VITE_ACCESS_CODE;

        // fetches individual images/videos
        const fetchMedia = async (id : string) => {
            const mediaUrl = `https://graph.instagram.com/${id}?access_token=${accessToken}&fields=media_url,permalink,media_type`;
            const image = await fetch (mediaUrl);
            const imageJson = await image.json();
            
            const instaItem = {
                permalink: imageJson.permalink,
                mediaUrl: imageJson.media_url,
                mediaType: imageJson.media_type
            }

            return instaItem;
        }

        // gets all the post ID's of user
        const fetchAll = async (userId : string) => {
            // base URL for fetching Instagram items
            const instaUrl = `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`
            // validate user ID and access token
            if (!userId || !accessToken) {
                console.log("Invalid User ID or Access Token")
                return;
            }
            const allPosts = await fetch(instaUrl);
            const allPostsJson = (await allPosts.json()).data;

            const instaItems : InstaItem[] = [];

            for (let i = 0 ; i < allPostsJson.length && i < 3 ; i++) {
                let postId = allPostsJson[i].id;
                const instaItem = await fetchMedia(postId);
                instaItems.push(instaItem);
            }

            setImageList(instaItems);
        }

        fetchAll(userId);
    }, []);

    return (<InstagramLayout imageList={imageList}/>)

}

export default InstagramItems;