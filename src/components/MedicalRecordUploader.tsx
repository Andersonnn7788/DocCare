
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, FileText, CheckCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { MedicalRecord } from "@/types/medical";

interface MedicalRecordUploaderProps {
  patientId?: string;
  onUploadComplete?: (fileUrls: string[]) => void;
  records?: MedicalRecord[];
  onRecordsChange?: (records: MedicalRecord[]) => void;
}

type UploadingFile = {
  id: string;
  name: string;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  url?: string;
};

const MedicalRecordUploader = ({ 
  patientId, 
  onUploadComplete,
  records = [],
  onRecordsChange
}: MedicalRecordUploaderProps) => {
  const [files, setFiles] = useState<UploadingFile[]>([]);
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();

  // Handle drag events
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  
  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };
  
  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };
  
  // Process the files
  const handleFiles = (fileList: FileList) => {
    const newFiles = Array.from(fileList).map(file => {
      // Check file type (only allow PDF, images, and common medical file formats)
      const validTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/dicom', 'text/xml'];
      if (!validTypes.includes(file.type) && !file.name.endsWith('.dcm')) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type`,
          variant: "destructive",
        });
        return null;
      }
      
      // Check file size (limit to 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 10MB limit`,
          variant: "destructive",
        });
        return null;
      }
      
      return {
        id: `file-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        progress: 0,
        status: 'uploading' as const,
      };
    }).filter(Boolean) as UploadingFile[];
    
    if (newFiles.length === 0) return;
    
    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate file upload for each file
    newFiles.forEach(file => {
      simulateUpload(file.id);
    });
  };
  
  // Remove a file
  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
  };
  
  // Simulate file upload with progress
  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 15) + 5;
      
      if (progress >= 100) {
        clearInterval(interval);
        progress = 100;
        
        setFiles(prev => 
          prev.map(file => 
            file.id === fileId 
              ? { 
                  ...file, 
                  progress: 100, 
                  status: 'complete', 
                  url: `https://example.com/files/${file.id}` 
                } 
              : file
          )
        );
        
        // Check if all files are uploaded
        setTimeout(() => {
          const allCompleted = files.every(f => f.status === 'complete');
          if (allCompleted && onUploadComplete) {
            const urls = files
              .filter(f => f.status === 'complete')
              .map(f => f.url!)
              .filter(Boolean);
            onUploadComplete(urls);
          }
        }, 500);
      } else {
        setFiles(prev => 
          prev.map(file => 
            file.id === fileId ? { ...file, progress } : file
          )
        );
      }
    }, 300);
  };

  const handleSubmitRecords = () => {
    // In a real application, this would send the completed files to a server
    // For demo purposes, we'll just show a success message
    const completedFiles = files.filter(f => f.status === 'complete');
    
    if (completedFiles.length === 0) {
      toast({
        title: "No files to submit",
        description: "Please upload at least one file before submitting",
        variant: "destructive",
      });
      return;
    }
    
    // Create mock medical records from the uploaded files
    const newRecords: MedicalRecord[] = completedFiles.map(file => ({
      id: `rec-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      patientId: patientId || "unknown",
      date: new Date().toISOString(),
      diagnosis: "Pending review",
      treatment: "Awaiting doctor assessment",
      doctorId: "system",
      doctorName: "System Upload",
      notes: `File uploaded: ${file.name}`,
    }));
    
    // Update records if callback provided
    if (onRecordsChange) {
      onRecordsChange([...records, ...newRecords]);
    }
    
    // Clear the file list
    setFiles([]);
    
    toast({
      title: "Records submitted successfully",
      description: `${completedFiles.length} file(s) have been uploaded to your medical records`,
      variant: "default",
    });
  };

  return (
    <div className="card p-6">
      <h2 className="text-xl font-semibold mb-2">Upload Medical Records</h2>
      <p className="text-gray-600 mb-4">
        Upload previous medical records, test results, or prescriptions to help with your diagnosis.
      </p>
      
      <div 
        className={`border-2 border-dashed rounded-lg p-6 text-center ${
          dragActive ? "border-emerald-500 bg-emerald-50" : "border-gray-300"
        }`}
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
      >
        <Upload className="h-10 w-10 text-gray-400 mx-auto mb-4" />
        <p className="text-sm text-gray-600 mb-1">Drag and drop your files here, or</p>
        <div>
          <label htmlFor="file-upload" className="btn-primary cursor-pointer inline-block">
            Browse Files
          </label>
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="sr-only"
            onChange={handleFileChange}
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.dcm,.xml"
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Supported formats: PDF, JPEG, PNG, DICOM, XML (up to 10MB)
        </p>
      </div>
      
      {files.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium">Uploaded Files</h3>
          {files.map((file) => (
            <div key={file.id} className="flex items-center bg-gray-50 p-3 rounded-md">
              <FileText className="h-5 w-5 text-gray-500 mr-2" />
              <div className="flex-grow">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">{file.name}</span>
                  {file.status === 'complete' ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                  <div
                    className={`h-1.5 rounded-full ${
                      file.status === 'error' ? 'bg-red-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${file.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
          
          <div className="flex justify-end mt-4">
            <Button 
              onClick={handleSubmitRecords} 
              className="flex items-center"
            >
              Submit Records
              <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {records && records.length > 0 && (
        <div className="mt-4 space-y-3">
          <h3 className="text-sm font-medium">Existing Medical Records</h3>
          {records.map((record, idx) => (
            <div key={record.id || `record-${idx}`} className="bg-gray-50 p-3 rounded-md">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">{new Date(record.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm text-gray-700 mt-1"><strong>Diagnosis:</strong> {record.diagnosis}</p>
              <p className="text-sm text-gray-700"><strong>Treatment:</strong> {record.treatment}</p>
              {record.notes && (
                <p className="text-sm text-gray-600 mt-1"><strong>Notes:</strong> {record.notes}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicalRecordUploader;
