import React, { useEffect, useRef } from 'react'
import { scanReceipt} from '../utils/helper';
import useFetch from '../hooks/useFetch';
import { Camera, Loader2 } from "lucide-react";
import toast from 'react-hot-toast';



const ReceiptScanner = ({ onScanComplete }) => {

  const fileInputRef = useRef();

  const {
    loading: scanReceiptLoading,
    fn: scanReceiptFn,
    data: scannedData,
  } = useFetch(scanReceipt);

  const handleReceiptScan = async(file) => {
    if(file.size > 5 * 1024 * 1024){
      toast.error("File size should be less than 5 mb")
      return;
    }

    await scanReceiptFn(file)
  };

  useEffect(() => {
    if(scannedData && !scanReceiptLoading){
      onScanComplete(scannedData)
      toast.success("Receipt Scanned Successfully");
    }
  },[scanReceiptLoading,scannedData]);

  return (
    <div className='flex items-center justify-center'>
      <input
        type="file"
        ref={fileInputRef}
        className='hidden'
        accept="image/*"
        capture="environment"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleReceiptScan(file);
        }}
      />
      <button
       type="button"
       className='w-full mb-5 h-10 rounded-lg justify-center items-center flex bg-gradient-to-br from-orange-500 via-pink-500 to-purple-500 animate-gradient hover:opacity-90 transition-opacity text-white hover:text-white '
       onClick={() => fileInputRef.current?.click()}
       disabled={scanReceiptLoading}
       >
        {scanReceiptLoading ? (
        <>
          <Loader2 className='mr-2 animate-spin' />
          <span>Scanning Receipt...</span>
        </>
      ) : (
        <>
          <Camera className="mr-2" />
          <span>

            Scan receipt with AI
          </span>
        </>
      )}
      </button>
    </div>
  )
}

export default ReceiptScanner