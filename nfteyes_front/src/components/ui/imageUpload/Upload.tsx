import React, { useState } from 'react'
import Image from 'next/image'
import uploadIcon from '../../../../public/images/icons/uploadIcon.svg'

const fileTypes = ['image/jpeg', 'image/png', 'image/gif']

interface IImageUpload {
    callback: (file: any) => Promise<any>
}

export default function ImageUpload(props: IImageUpload) {
    const { callback } = props
    const [selectedImage, setSelectedImage] = useState<File | null>(null)
    //var fileInput = document.getElementById('file');

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setSelectedImage(file)
            if (callback) {
                callback(event.target.files?.[0])
            }
        }
        // showGlobalPopup(GLOBAL_POPUP_TYPES.ANALYZE)
    }

    const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
    }

    const handleDragEnter = (e: React.DragEvent<HTMLLabelElement>) => {
        e.currentTarget.classList.add('drag-active')
    }

    const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
        e.currentTarget.classList.remove('drag-active')
    }

    const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault()
        const dropContainer = e.currentTarget

        dropContainer.classList.remove('drag-active')
        const file = e.dataTransfer.files?.[0]
        if (file) {
            setSelectedImage(file)
        }
    }

    return (
        <>
            <div
                className="mb-[60px] min-h-[180px] border border-[#888888] rounded-md "
                style={{
                    background: 'linear-gradient(180deg, rgba(73, 46, 156, 0.42) 0%, rgba(78, 43, 168, 0.00) 100%)',
                }}
            >
                {!selectedImage ? (
                    <div className="square bottom-left">
                        <label
                            htmlFor="images"
                            className={`drop-container ${selectedImage ? 'with-image' : ''} ${
                                selectedImage && 'image-present'
                            }`}
                            id="dropcontainer"
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="min-h-[180px] flex items-center justify-center ">
                                <div>
                                    <div className="flex flex-row justify-center items-center gap-10">
                                        <div className="">
                                            <Image src={uploadIcon} alt="" width={24} height={24} />
                                        </div>
                                        <span className="text-gray-400 font-abelRegular text-24">Drag your image</span>
                                    </div>
                                </div>
                                <div className="hidden">
                                    <input
                                        type="file"
                                        accept="image/*, audio/*, video/*"
                                        onChange={handleImageUpload}
                                        id="images"
                                        style={{ visibility: 'hidden' }}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                ) : (
                    <div className="square bottom-left">
                        <label
                            htmlFor="images"
                            className={`drop-container ${selectedImage ? 'with-image' : ''} ${
                                selectedImage && 'image-present'
                            }`}
                            id="dropcontainer"
                            onDragOver={handleDragOver}
                            onDragEnter={handleDragEnter}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            <div className="min-h-[180px] flex items-center justify-center">
                                <div>
                                    <div className="flex flex-row justify-center items-center gap-10">
                                        <div className="square top-left flex justify-center items-center min-h-[180px]">
                                            {fileTypes.includes(selectedImage?.type) ? (
                                                <img
                                                    className="max-h-[180px]"
                                                    src={URL.createObjectURL(selectedImage)}
                                                />
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                                <div className="hidden">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageUpload}
                                        id="images"
                                        style={{ visibility: 'hidden' }}
                                    />
                                </div>
                            </div>
                        </label>
                    </div>
                )}
            </div>
            <div></div>
        </>
    )
}
