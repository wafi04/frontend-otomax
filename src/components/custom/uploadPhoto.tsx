import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { UploadResult, useUploadPhoto } from "@/hooks/use-uploadphoto";

interface PhotoUploaderProps {
  onUploadComplete?: (result: UploadResult) => void;
  onUploadError?: (error: string) => void;
  className?: string;
  accept?: string;
  maxSize?: number; // in bytes
  preview?: boolean;
  multiple?: boolean;
}

export function PhotoUploader({
  onUploadComplete,
  onUploadError,
  className,
  accept = "image/*",
  maxSize = 10 * 1024 * 1024, // 10MB
  preview = true,
  multiple = false,
}: PhotoUploaderProps) {
  const { uploadPhoto, isUploading, error, progress } = useUploadPhoto();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);

    if (preview) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const result = await uploadPhoto(selectedFile);
      if (result) {
        onUploadComplete?.(result);
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "Upload failed";
      onUploadError?.(errorMsg);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Hidden File Input */}
      <Input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileSelect}
        className="hidden"
        multiple={multiple}
      />

      {/* Upload Area */}
      {!selectedFile ? (
        <div
          onClick={openFileDialog}
          className="border-2 border-dashed  rounded-lg p-8 text-center cursor-pointer hover:border-gray-400 transition-colors"
        >
          <ImageIcon className="mx-auto h-12 w-12  mb-4" />
          <p className="text-sm text-gray-600 mb-2">
            Klik untuk memilih foto atau drag & drop
          </p>
          <p className="text-xs text-gray-400">
            PNG, JPG, JPEG hingga {Math.round(maxSize / (1024 * 1024))}MB
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Preview */}
          {preview && previewUrl && (
            <div className="relative">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute top-2 right-2"
                onClick={clearSelection}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* File Info */}
          <div className="p-3 rounded-lg">
            <p className="text-sm font-medium">{selectedFile.name}</p>
            <p className="text-xs text-gray-500">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </p>
          </div>

          {/* Progress Bar */}
          {isUploading && (
            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-center text-gray-500">
                Uploading... {progress}%
              </p>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleUpload}
              disabled={isUploading}
              className="flex-1"
            >
              <Upload className="h-4 w-4 mr-2" />
              {isUploading ? "Uploading..." : "Upload"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={clearSelection}
              disabled={isUploading}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
