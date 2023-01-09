import { videoSources } from "./videoSources.js"

let views = '125.000   :   2 days ago'
let likes = 80973
let subscribers = "1.780.954"

const myVideo = document.getElementById("myVideo")
const infoVideo = document.getElementById('description-video')

const scrollVideos = document.getElementById('scrollVideo')

function videoElementScroll(api) {
    const allItems = []

    api.forEach((element) => {
    const thumb = document.createElement('img')
    thumb.classList.add('contentScrollVideo__img')
    thumb.src = element.thumb

    const title = document.createElement('h3')
    title.textContent = element.title

    const author = document.createElement('h4')
    author.textContent = element.author

    const view = document.createElement('h4')
    view.textContent = views

    const infoScrollVideo = document.createElement('div')
    infoScrollVideo.classList.add('listVideos__content--info')
    infoScrollVideo.append(title, author, view)

    const contentScrollVideo = document.createElement('div')
    contentScrollVideo.classList.add('listVideos__content')
    contentScrollVideo.append(thumb, infoScrollVideo)

    contentScrollVideo.addEventListener('click', () => {
        let previouslySelectedItem
        myVideo.src = element.sources

        infoVideo.innerHTML = ''
    
        const authorContent = document.createElement('div')
        authorContent.classList.add('playerContainer__info--author')
        const authorInfo = document.createElement('div')
        authorInfo.classList.add('playerContainer__info--descriiption')
    
        const authorAvatar = document.createElement('img')
        authorAvatar.src = element.authorAvatar
        const authorName = document.createElement('h4')
        authorName.textContent = element.author
        const authorSubscribers = document.createElement('p')
        authorSubscribers.textContent = `${subscribers} subscribers`
    
        const title = document.createElement('h3')
        title.textContent = element.title
    
        const description = document.createElement('p')
        description.textContent = element.description
    
        authorInfo.append(authorName, authorSubscribers)
        authorContent.append(authorAvatar, authorInfo)
        infoVideo.append(authorContent, title, description)

        if (previouslySelectedItem) {
            scrollVideos.insertBefore(previouslySelectedItem, scrollVideos.firstChild)
          }
          previouslySelectedItem = contentScrollVideo

        scrollVideos.removeChild(contentScrollVideo)
    })
    
    allItems.push(contentScrollVideo)
    })
    scrollVideos.append(...allItems)
}

videoElementScroll(videoSources)