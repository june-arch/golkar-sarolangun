export const Form = ({ formik, header, children }) => {
  return (
    <div className="w-full">
      {children}
      <form onSubmit={formik.handleSubmit}>
        {header.map((value, key) => (
          <div className="mb-6" key={key}>
          <input
            type="text"
            className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            id={value}
            name={value}
            onChange={formik.handleChange}
            value={formik.values[value]}
            placeholder={`Name of ${value}`}
          />
          {formik.touched[value] && formik.errors[value] ? (
            <p className=" text-red-500">{formik.errors[value]}</p>
          ) : null}
        </div>
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
