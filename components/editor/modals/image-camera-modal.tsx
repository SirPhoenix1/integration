import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";
import { Camera } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Editor } from "@tiptap/react";

const imgW = 1000;
const imgH = 1000;

interface CameraItemProps {
  editor: Editor;
}

const CameraItem = ({ editor }: CameraItemProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImgSrc(imageSrc);
    }
  }, [webcamRef]);

  const retake = () => {
    setImgSrc(null);
  };

  const submit = () => {
    if (imgSrc) {
      editor.chain().focus().setImage({ src: imgSrc, alt: "" }).run();
    }
  };

  return (
    <Popover modal>
      <PopoverTrigger asChild>
        <button>
          <Camera className="h-4 w-4 mr-2 inline" color="gray" />
          Upload From Camera
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          {imgSrc ? (
            <>
              <Image src={imgSrc} alt="webcam" width={imgW} height={imgH} />
              <div className="mt-3 flex justify-between">
                <Button onClick={retake}>Retake</Button>
                <Button onClick={submit}>Confirm</Button>
              </div>
            </>
          ) : (
            <>
              <Webcam height={imgH} width={imgW} ref={webcamRef} />
              <div className="text-right mt-3">
                <Button onClick={capture}>Capture Photo</Button>
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default CameraItem;
