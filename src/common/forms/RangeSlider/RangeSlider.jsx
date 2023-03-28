import {
  ChakraProvider,
  RangeSlider as Slider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Box,
  RangeSliderMark,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { style } from "./RangeSlider.styles";

export const RangeSlider = ({dataRange, setRange}) => {
  const {min, max, minRange, maxRange} = dataRange
  const [[first, second], setSliderValue] = useState([minRange, maxRange]);

  useEffect(() => {
    setRange([first, second])
  }, [first, second ])

  return (
    <ChakraProvider>
      <Slider
        defaultValue={[first, second || 1]}
        min={min}
        max={max || 1}
        onChange={(val) => setSliderValue(val)}
      >
        <RangeSliderMark value={first} {...style.rangeSliderMark}>
          {first}
        </RangeSliderMark>
        <RangeSliderMark value={second || 1} {...style.rangeSliderMark}>
          {second || 1}
        </RangeSliderMark>
        <RangeSliderTrack {...style.rangeSliderTrack}>
          <RangeSliderFilledTrack {...style.rangeSliderFilledTrack} />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} {...style.rangeSliderThumb}>
          <Box {...style.box} />
        </RangeSliderThumb>
        <RangeSliderThumb index={1} {...style.rangeSliderThumb}>
          <Box {...style.box} />
        </RangeSliderThumb>
      </Slider>
    </ChakraProvider>
  );
};
