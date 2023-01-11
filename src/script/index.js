import { videoSources } from "./videoSources.js"

const videoPlayerTemplate = document.createElement('template')
videoPlayerTemplate.innerHTML = `
    <img class="contentScrollVideo__img" src="">
    <div class="listVideos__content--info">
        <h3></h3>
        <h4></h4>
        <h4></h4>
    </div>
`

const mainContainer = document.getElementById('main')
mainContainer.classList.remove('mainContainer')
const myVideo = document.getElementById("myVideo")
myVideo.classList.add('inactive')
const infoVideo = document.getElementById('description-video')
infoVideo.classList.add('inactive')
const scrollVideos = document.getElementById('scrollVideo')
scrollVideos.classList.remove('listVideos')

const seeDescriptionBtn = document.createElement('button')
seeDescriptionBtn.textContent = 'See Description'
const ocultDescriptionBtn = document.createElement('button')
ocultDescriptionBtn.textContent = 'Ocult Description'

seeDescriptionBtn.classList.add('primary-button')
ocultDescriptionBtn.classList.add('primary-button')

let previouslySelectedItem
let views = '125.000   :   2 days ago'
let subscribers = "1.780.954"

function createVideoElement(video) {
    const videoElement = videoPlayerTemplate.content.cloneNode(true)
    videoElement.querySelector('.contentScrollVideo__img').src = video.thumb
    videoElement.querySelector('h3').textContent = video.title
    videoElement.querySelector('h4:nth-of-type(1)').textContent = video.author
    videoElement.querySelector('h4:nth-of-type(2)').textContent = views

    const contentScrollVideo = document.createElement('div')
    contentScrollVideo.classList.add('listVideos__content')
    contentScrollVideo.append(videoElement)

    contentScrollVideo.addEventListener('click', () => {
        mainContainer.classList.add('mainContainer')
        scrollVideos.classList.add('listVideos')
        myVideo.classList.remove('inactive')
        infoVideo.classList.remove('inactive')
        infoVideo.innerHTML = ''
        myVideo.src = video.sources

        const authorContent = document.createElement('div')
        authorContent.classList.add('playerContainer__info--author')

        const authorInfo = document.createElement('div')
        authorInfo.classList.add('playerContainer__info--description')

        const authorAvatar = document.createElement('img')
        authorAvatar.src = video.authorAvatar
        const authorName = document.createElement('h4')
        authorName.textContent = video.author
        const authorSubscribers = document.createElement('p')
        authorSubscribers.textContent = `${subscribers} subscribers`

        authorInfo.append(authorName, authorSubscribers)
        authorContent.append(authorAvatar, authorInfo)
        infoVideo.append(authorContent)

        if (previouslySelectedItem) {
            scrollVideos.insertBefore(previouslySelectedItem, scrollVideos.firstChild)
        }

        previouslySelectedItem = contentScrollVideo

        scrollVideos.removeChild(contentScrollVideo)

        handleSeeDescriptionBtn(video)
    })

    return contentScrollVideo
}

function handleSeeDescriptionBtn(video) {
    infoVideo.append(seeDescriptionBtn)
    seeDescriptionBtn.classList.remove('inactive')

    const title = document.createElement('h3')
    title.textContent = video.title

    const description = document.createElement('p')
    description.textContent = video.description

    title.classList.add('inactive')
    description.classList.add('inactive')
    ocultDescriptionBtn.classList.add('inactive')

    infoVideo.append(title, description, ocultDescriptionBtn)

    seeDescriptionBtn.addEventListener('click', () => {
        seeDescriptionBtn.classList.add('inactive')

        title.classList.remove('inactive')
        description.classList.remove('inactive')
        ocultDescriptionBtn.classList.remove('inactive')

        ocultDescriptionBtn.addEventListener('click',()=>handleOcultDescriptionBtn(title,description))
    })
}

function handleOcultDescriptionBtn(title, description) {
    title.classList.add('inactive')
    description.classList.add('inactive')
    ocultDescriptionBtn.classList.add('inactive')

    seeDescriptionBtn.classList.remove('inactive')
}

videoSources.forEach(itemVideo => scrollVideos.appendChild(createVideoElement(itemVideo)));
