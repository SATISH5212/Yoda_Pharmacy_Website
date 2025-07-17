import { IFieldFormPageProps } from "@/lib/interfaces/maps";
import { FC } from "react";

const FieldFormPage: FC<IFieldFormPageProps> = (props) => {
    const { handleSubmit, onSubmit, register, displayArea, isPending, handleAddAccessPoint, fieldAccessPoint, handleRobotHome, robotHome, handleCancel, errorMessages, handleDeleteAccessPoint, handleDeleteRobotHome } = props
    return (
        <div className="absolute z-10  right-4 bg-white shadow-2xl rounded-2xl h-[96vh] w-[26vw] -mr-2 my-4">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-full w-full relative"
                noValidate
            >
                <div className="flex flex-col p-4 gap-4">
                    <div className="flex flex-row justify-between items-center mb-2">
                        <h1 className="text-md font-semibold tracking-wide">Register Field</h1>
                        <span
                            className="cursor-pointer text-red-500 font-semibold"
                            onClick={handleCancel}
                        >
                            X
                        </span>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Field Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register("field_name")}
                            className="mt-1 block w-full rounded-md bg-gray-100 border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500"
                            placeholder="Placeholder"
                        />
                        {errorMessages.field_name && (
                            <span className='text-red-500 text-[10px] mt-1'>{errorMessages.field_name}</span>
                        )}
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="font-medium text-gray-700">Geographic Area</span>
                        <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md font-medium text-xs">
                            {displayArea} <span className="text-gray-600">Acres</span>
                        </span>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Field Access Point <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleAddAccessPoint}
                                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md text-xs font-medium disabled:opacity-50 transition-colors duration-200"
                            >
                                {fieldAccessPoint ? "✓ Set" : "+ Add"}
                            </button>
                            {fieldAccessPoint && (
                                <button
                                    type="button"
                                    onClick={handleDeleteAccessPoint}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
                                    title="Delete Access Point"
                                >
                                     Remove
                                </button>
                            )}
                            {errorMessages.field_access_point && (
                                <span className='text-red-500 text-[10px] mt-1'>{errorMessages.field_access_point}</span>
                            )}
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium text-gray-700">
                            Robot Home <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleRobotHome}
                                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md text-xs font-medium disabled:opacity-50 transition-colors duration-200"
                            >
                                {robotHome ? "✓ Set" : "+ Add"}
                            </button>
                            {robotHome && (
                                <button
                                    type="button"
                                    onClick={handleDeleteRobotHome}
                                    className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200"
                                    title="Delete Robot Home"
                                >
                                     Remove
                                </button>
                            )}
                            {errorMessages.robot_home && (
                                <span className='text-red-500 text-[10px] mt-1'>{errorMessages.robot_home}</span>
                            )}
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-xs transition-colors duration-200 disabled:opacity-50 cursor-pointer "
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 cursor-pointer text-white px-4 py-2 rounded-md text-xs font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <span className="flex items-center gap-1">
                                <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                                Saving...
                            </span>
                        ) : (
                            "Save"
                        )}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FieldFormPage;