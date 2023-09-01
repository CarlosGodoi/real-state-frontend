import { UploadSimple } from "@phosphor-icons/react";
import Image from "next/image";
import { ChangeEvent } from "react";
import { useState } from "react";
import { useDropzone } from "react-dropzone";

interface IProps {
  onUploadImage: (e: any) => void;
  onSetBaseImage: (images: string[]) => void;
  type: string;
  id: string;
  name: string;
}

export const DropzoneImage: React.FC<IProps> = ({
  id,
  name,
  onUploadImage,
  onSetBaseImage,
  type,
}) => {
  const [files, setFiles] = useState<any>([]);
  const { getInputProps, getRootProps, acceptedFiles, fileRejections } =
    useDropzone({
      maxFiles: 3,
      accept: {
        image: [".jpg", ".jpeg", ".png"],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );

        onUploadImage(acceptedFiles);
      },
    });

  const preview = files.map((file: any) => (
    <div
      key={file.preview}
      className="w-full h-32 mt-1 relative object-contain">
      <Image src={file.preview} alt="preview" fill={true} />
    </div>
  ));

  const acceptedFilesItems = acceptedFiles.map((file) => {
    return <li key={file.name}>{file.name}</li>;
  });

  const fileRejectionsItems = fileRejections.map(({ file, errors }) => {
    return <li key={file.name}>{file.name}</li>;
  });

  return (
    <div className="w-[90%] flex flex-col border-2 border-dark_blue rounded-lg iphone_XR:w-[90%] laptop:w-[70%] desktop:w-[80%] notebook_13p:w-[70%]">
      <div className="w-full p-3 flex justify-center items-center bg-dark_blue text-white text-xl">
        <h2>Upload de imagens</h2>
      </div>
      <div
        className="w-full h-[100px] flex justify-center items-center border-2 mt-1 border-dashed border-zinc-400 rounded-lg"
        {...getRootProps()}>
        <input
          type={type}
          id={id}
          name={name}
          onChange={onUploadImage}
          className="w-full h-10 bg-zinc-300 border-2"
          {...getInputProps()}
        />
        <div className="flex flex-col gap3 justify-center items-center">
          <UploadSimple size={30} className="text-dark_blue" />
          <p className="text-dark_blue">Arraste seus arquivos</p>
        </div>
      </div>
      <div className="w-full flex justify-between mt-3 iphone_XR:text-sm iphone_SE:text-sm">
        <div className="w-full flex flex-col items-center">
          Arquivos aceitos {acceptedFilesItems}
        </div>
        <div className="w-full flex flex-col items-center iphone_XR:text-sm iphone_SE:text-sm">
          Arquivos Rejeitados {fileRejectionsItems}
        </div>
      </div>
      <div className="w-full flex justify-around gap-1 p-2 iphone_XR:flex-col">
        {preview}
      </div>
    </div>
  );
};
