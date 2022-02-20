const CreateClass = (base: string, addon: string, extraClass?: string[]): string => {
    const extra = extraClass ? extraClass!.join(" ") : "";
    return `${base}-${addon} ${extra}`;
};

export default CreateClass;
