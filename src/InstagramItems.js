import React, { useEffect } from "react";
import InstagramLayout from "./InstagramLayout";

const InstagramItems = ({ imageList, setImageList }) => {

    // params needed to query the Instagram API
    const userId = process.env.REACT_APP_USER_ID;
    const accessToken = process.env.REACT_APP_ACCESS_CODE;

    const fetchMedia = async (id) => {
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

    const fetchAll = async (userId) => {
        // base URL for fetching Instagram items
        const instaUrl = `https://graph.instagram.com/${userId}/media?access_token=${accessToken}`
        // validate user ID and access token
        if (!userId || !accessToken) {
            console.log("Invalid User ID or Access Token")
            return;
        }
        const allPosts = await fetch(instaUrl);
        const allPostsJson = (await allPosts.json()).data;

        const instaItems = [];

        for (let i = 0 ; i < allPostsJson.length && i < 3 ; i++) {
            let postId = allPostsJson[i].id;
            const instaItem = await fetchMedia(postId);
            instaItems.push(instaItem);
        }

        setImageList(instaItems);
    }

    useEffect(() => {
        fetchAll(userId);
    }, []);

    return (<InstagramLayout imageList={imageList}/>)

}

export default InstagramItems;