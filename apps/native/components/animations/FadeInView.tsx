import React, { useEffect, useRef } from "react";
import { Animated, ViewProps } from "react-native";

interface FadeInViewProps extends ViewProps {
  duration?: number;
  delay?: number;
  className?: string;
}

export const FadeInView: React.FC<FadeInViewProps> = ({
  children,
  duration = 200,
  delay = 0,
  className = "",
  style,
  ...props
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: duration,
        delay: delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, translateY, duration, delay]);

  return (
    <Animated.View
      style={[
        style,
        {
          opacity: fadeAnim,
          transform: [{ translateY }],
        },
      ]}
      className={className}
      {...props}
    >
      {children}
    </Animated.View>
  );
};
