import React from 'react';
import { View } from 'react-native';
import BellSVG from '@assets/icons/bell.svg';
import EyeSVG from '@assets/icons/eye.svg';
import LeftArrowSVG from '@assets/icons/left-arrow.svg';
import LogoSVG from '@assets/icons/logo.svg';
import LoveSVG from '@assets/icons/love.svg';
import PlusSVG from '@assets/icons/plus.svg';
import QuestionSVG from '@assets/icons/question.svg';
import DotThreeSVG from '@assets/icons/three-dots.svg';
import HomeSVG from '@assets/icons/home.svg';
import ProfileSVG from '@assets/icons/profile.svg';
import UpArrowSVG from '@assets/icons/up-arrow.svg';
import CommentSVG from '@assets/icons/comment.svg';
import ShareSVG from '@assets/icons/share.svg';
import EyeOffSVG from '@assets/icons/eye-off.svg';

type IconVariant =
  | 'bell'
  | 'question'
  | 'plus'
  | 'eye'
  | 'three-dots'
  | 'logo'
  | 'home'
  | 'profile'
  | 'up-arrow'
  | 'comment'
  | 'share'
  | 'eye-off'
  | 'love';

interface IconProps extends React.ComponentProps<typeof View> {
  variant: IconVariant;
  size?: number;
  fill?: string;
}

const IconPath = {
  'left-arrow': LeftArrowSVG,
  logo: LogoSVG,
  love: LoveSVG,
  bell: BellSVG,
  question: QuestionSVG,
  plus: PlusSVG,
  'three-dots': DotThreeSVG,
  eye: EyeSVG,
  home: HomeSVG,
  profile: ProfileSVG,
  'up-arrow': UpArrowSVG,
  comment: CommentSVG,
  share: ShareSVG,
  'eye-off': EyeOffSVG,
};

const Icon = ({ variant, style, size = 24, fill = 'black' }: IconProps) => {
  const SvgIcon = IconPath[variant];
  return (
    <View style={style}>
      <SvgIcon width={size} height={size} fill={fill} />
    </View>
  );
};

export default Icon;
