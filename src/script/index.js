import { videoSources } from "./videoSources.js"

let views = 125000
let likes = 80973
let subscribers = 1780954

const myVideo = document.getElementById("myVideo")
const infoVideo = document.getElementById('description-video')

const scrollVideos = document.getElementById('scrollVideo')

function videoElementScroll(api) {
    const allItems = []

    api.forEach((element) => {
    const thumb = document.createElement('img')
    thumb.width = 200
    thumb.src = element.thumb

    const title = document.createElement('h3')
    title.textContent = element.title

    const author = document.createElement('h4')
    author.textContent = element.author

    const view = document.createElement('h4')
    view.textContent = views

    const contentscrollVideo = document.createElement('div')
    contentscrollVideo.append(thumb, title, author, view)

    contentscrollVideo.addEventListener('click', () => {
        myVideo.src = element.sources

        infoVideo.innerHTML = ''
    
        const authorContent = document.createElement('div')
    
        const authorAvatar = document.createElement('img')
        authorAvatar.src = element.authorAvatar
        const authorName = document.createElement('h4')
        authorName.textContent = element.author
    
        const title = document.createElement('h3')
        title.textContent = element.title
    
        const description = document.createElement('p')
        description.textContent = element.description
    
        authorContent.append(authorAvatar, authorName)
        infoVideo.append(authorContent, title, description)

        console.log(element.title)
    })
    
    allItems.push(contentscrollVideo)
    })
    scrollVideos.append(...allItems)
}

videoElementScroll(videoSources)