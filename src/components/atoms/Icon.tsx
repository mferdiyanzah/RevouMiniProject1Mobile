import React from 'react';
import { View, ViewStyle } from 'react-native';
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
import SendSVG from '@assets/icons/send.svg';
import FileSVG from '@assets/icons/file.svg';
import ImageSVG from '@assets/icons/image.svg';

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
  | 'left-arrow'
  | 'send'
  | 'file'
  | 'image'
  | 'love';

interface IconProps extends React.ComponentProps<typeof View> {
  variant: IconVariant;
  size?: number;
  fill?: string;
  style?: ViewStyle;
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
  send: SendSVG,
  file: FileSVG,
  image: ImageSVG,
};

const Icon = ({ variant, size = 24, style }: IconProps) => {
  const SvgIcon = IconPath[variant];
  return (
    <View>
      <SvgIcon width={size} height={size} style={style} />
    </View>
  );
};

export default Icon;
