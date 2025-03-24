import { View, type ViewProps } from "react-native";

import { useThemeColor } from "@/hooks/themes/useThemeColor";

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
  className?: string;
};

export function ThemedView({
  style,
  lightColor,
  darkColor,
  className,
  ...otherProps
}: ThemedViewProps) {
  const backgroundColor = useThemeColor(
    { light: lightColor, dark: darkColor },
    "background",
  );

  return (
    <View
      className={className}
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
