import 'draft-js/dist/Draft.css';
import { Field } from 'formik';
import CustomSelect from './CustomSelect';
import { TextEditor } from './MyEditor';
import Image from 'next/image'

export const Input = ({ value, formik, data, content }: { value: string, formik: any, data?: any, content?: any }) => {
    const handleInput = () => {
        if(value == 'image'){
            return (
                <div>
                    <input
                    type={'file'}
                    className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id={value}
                    name={value}
                    onChange={(e) => formik.setFieldValue(value, e.currentTarget.files[0])}
                    accept={'image/*'}
                    />
                    {(content && content.image) && <Image id={value} src={'/uploads/images/news/'+content.image} alt="your image" width={200} height={200} />}
                </div>)
        }
        if(value == 'content'){
            return (
                <TextEditor
                    content={content.content}
                    setFieldValue={(val) => formik.setFieldValue("content", val)}
                    value={formik.values[value]}
                />)
        }
        if(value.split('_').map((value) => value.toLowerCase()).find((item) => item == 'id')){
            return (
                <Field
                    className="custom-select"
                    name={value}
                    options={data}
                    component={CustomSelect}
                    placeholder="Select a id..."
                    isMulti={false}
                />
            )
        }
        return (
            <input
                type={'text'}
                className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id={value}
                name={value}
                onChange={formik.handleChange}
                value={formik.values[value]}
                placeholder={`Name of ${value}`}
            />
        )
    }
    const handleValue = (text: string) => {
        return text.split('_').map((item) => item = item.charAt(0).toUpperCase() + item.substring(1)).join(' ').replace('Id','').trim();
    }
    return (
        <div className="mb-6">
            <label
                htmlFor={value}
                className="block text-xl pb-2"
            >
                {handleValue(value)}
            </label>
            {handleInput()}
            {formik.touched[value] && formik.errors[value] && (<p className=" text-red-500">{formik.errors[value]}</p>)}
        </div>
    )
}
