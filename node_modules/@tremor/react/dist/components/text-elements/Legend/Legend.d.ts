import React from "react";
import { Color } from "lib";
export interface LegendItemProps {
    name: string;
    color: Color;
    onClick?: (name: string, color: Color) => void;
    activeLegend?: string;
}
export interface ScrollButtonProps {
    icon: React.ElementType;
    onClick?: () => void;
    disabled?: boolean;
}
export interface LegendProps extends React.OlHTMLAttributes<HTMLOListElement> {
    categories: string[];
    colors?: Color[];
    onClickLegendItem?: (category: string, color: Color) => void;
    activeLegend?: string;
    enableLegendSlider?: boolean;
}
declare const Legend: React.ForwardRefExoticComponent<LegendProps & React.RefAttributes<HTMLOListElement>>;
export default Legend;
