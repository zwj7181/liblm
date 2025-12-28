import { BraftEditorProps } from "braft-editor";

export interface EditorProps extends BraftEditorProps {
    bordered?: boolean;
    onUpload?: any;
    onChange?: any;
    style?: any;
}