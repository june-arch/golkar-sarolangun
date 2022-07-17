import { Input } from "./Input"

export const Form = ({ formik, header, data, content, children } : {formik:any, header:any, data?:any, content?: any, children?:any}) => {
  return (
    <div className="w-full">
      {children}
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        {header.map((value, key) => (
          <Input value={value} formik={formik} data={data} content={content} key={key}/>
        ))}

        <div className="text-center lg:text-left">
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
