import yaml from "js-yaml";
export const fetchAndParseYAMLFile = async (): Promise<any> => {
    const response = await fetch("https://your-api.com/field_2.yaml");
    if (!response.ok) {
        throw new Error(`Failed to fetch file: ${response.status}`);
    }
    const blob = await response.blob();
    const text = await blob.text();
    const jsonData = yaml.load(text);
    return jsonData;
};
