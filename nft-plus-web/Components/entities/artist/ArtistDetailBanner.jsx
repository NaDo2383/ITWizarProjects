
function ArtistDetailBanner({ artist }) {

  return (
    <div className="flex flex-col items-center sm:w-full w-[360px] mx-auto relative mt-[15px] sm:mt-0">
      {/* <h2 className="hidden sm:block text-[30px] text-center text-[#E0E6E8] font-[500] -tracking-[0.36px] py-[80px]">
        {submenu_artist}
      </h2> */}
      <div className="container sm:rounded-[5px] overflow-hidden">
        {artist?.result?.bgFileUrl ? (
          <div className="bg-slate-400">
              <img 
                src={artist?.result?.bgFileUrl} 
                width={1410} 
                height={300} 
                alt='artist-banner-image' 
                className="object-cover h-[200px] sm:h-[240px]" 
              />
          </div>
        ) : (
          <div className="w-[1410px] min-h-[300px] bg-[rgba(39,39,39)]"></div>
        )}
      </div>
    </div>
  )
}

export default ArtistDetailBanner