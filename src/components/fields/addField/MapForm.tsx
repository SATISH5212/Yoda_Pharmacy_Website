import { IFieldFormPageProps } from "@/lib/interfaces/maps";
import { FC } from "react";

const FieldFormPage: FC<IFieldFormPageProps> = (props) => {
    const { handleSubmit, onSubmit, register, isPending, errors, displayArea, handleAddAccessPoint, fieldAccessPoint, handleRobotHome, robot_home ,isSubmittable, handleCancel} = props
    return (
        <div className="absolute z-10 top-4 right-4 bg-white shadow-2xl rounded-2xl">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="h-132 w-78 relative"
                noValidate
            >
                <div className="flex flex-col p-4 gap-3">
                    <h1 className="text-sm font-semibold text-center mb-2">Register Field</h1>
                    <div>
                        <label className="text-xs font-medium text-gray-700">
                            Field Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            {...register('field_name', {
                                required: 'Field name is required',
                                minLength: {
                                    value: 2,
                                    message: 'Field name must be at least 2 characters'
                                },
                                maxLength: {
                                    value: 50,
                                    message: 'Field name must not exceed 50 characters'
                                },
                                pattern: {
                                    value: /^[a-zA-Z0-9\s-_]+$/,
                                    message: 'Field name can only contain letters, numbers, spaces, hyphens, and underscores'
                                }
                            })}
                            className={`mt-1 bg-gray-50 border rounded-md w-full p-2 text-xs focus:outline-none focus:ring-2 transition-colors duration-200 ${errors.field_name
                                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                : 'border-gray-200 focus:ring-green-500 focus:border-transparent'
                                }`}
                            placeholder="Enter field name"
                            disabled={isPending}
                        />
                        {errors.field_name && (
                            <p className="mt-1 text-xs text-red-600">{errors.field_name.message}</p>
                        )}
                    </div>
                    <div className="flex justify-between items-center text-xs">
                        <span className="font-medium text-gray-700">Geographical Area</span>
                        <span className="bg-red-50 text-red-600 px-2 py-1 rounded-md font-medium">
                            {displayArea} <span className="text-gray-600">Hectares</span>
                        </span>
                    </div>

                    <div>
                        <label className="text-xs font-medium text-gray-700">
                            Field Access Point <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleAddAccessPoint}
                                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 disabled:opacity-50"
                                disabled={isPending}
                            >
                                {fieldAccessPoint ? "✓ Set" : "+ Add"}
                            </button>
                            {fieldAccessPoint && (
                                <span className="text-xs text-gray-500 truncate">
                                    ({fieldAccessPoint.lat.toFixed(4)}, {fieldAccessPoint.lng.toFixed(4)})
                                </span>
                            )}
                        </div>
                    </div>

                     <div>
                        <label className="text-xs font-medium text-gray-700">
                            Robot Home <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-1 flex items-center gap-2">
                            <button
                                type="button"
                                onClick={handleRobotHome}
                                className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1.5 rounded-md text-xs font-medium transition-colors duration-200 disabled:opacity-50"
                                disabled={isPending}
                            >
                                {robot_home ? "✓ Set" : "+ Add"}
                            </button>
                            {robot_home && (
                                <span className="text-xs text-gray-500 truncate">
                                    ({robot_home.lat.toFixed(4)}, {robot_home.lng.toFixed(4)})
                                </span>
                            )}
                        </div>
                    </div>

                </div>
                <div className="absolute bottom-4 right-4 flex gap-2">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-md text-xs transition-colors duration-200 disabled:opacity-50"
                        disabled={isPending}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-xs font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        disabled={!isSubmittable}
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