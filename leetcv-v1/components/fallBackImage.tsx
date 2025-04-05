interface FallBackImageProps{
    className : string,
}

const FallBackImage=({className}:FallBackImageProps)=>{
    return <img src="/assets/fallbackImage.png" alt="no-found" className={className}/>
}

export default FallBackImage;