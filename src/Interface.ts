import { RefObject } from "react"

export type SubsectionType = {
    animate: boolean,
    ref: RefObject<HTMLDivElement>
}

export type InstaItem = {
    permalink: string, 
    mediaUrl: string, 
    mediaType: string
}

export type InstagramLayoutProps = {
    imageList: InstaItem[]
}

export type AboutPageProps = {
  scrollToContact: any,
  mapSize: { width: number; height: number },
};

export type TransitItem = {
    name: string,
    embeddedUrl: string,
    url: string,
    accessibility: string,
    accessibilityVerifier: string
}

export type ServiceItem = {
    service: string,
    price: string,
    time: string
}

export type NoteItem = {
    title: string,
    content: string
}

export type FormItem = {
    field : string,
    placeholder : string,
    type : string
}