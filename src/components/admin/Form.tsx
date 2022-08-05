import { useRouter } from "next/router"
import { Input } from "./Input"

export const Form = ({ formik, header, data, content, bucket, isMultiple, children } : {formik:any, header:any, data?:any, content?: any, bucket?: string, isMultiple?: boolean, children?:any}) => {
  const router = useRouter();
  return (
    <div className="w-full">
      {children}
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {header.map((value, key) => (
          <Input value={value} formik={formik} data={data} content={content} bucket={bucket} key={key} isMultiple={isMultiple}/>
        ))}

        <div className="text-center lg:text-left space-x-2">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="inline-block px-7 py-3 bg-gray-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-gray-700 hover:shadow-lg focus:bg-gray-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}
