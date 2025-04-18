import {
  IconAugmentedReality,
  IconBrandGit,
  IconCloudComputing,
  IconCloudLock,
  IconCode,
  IconServer2,
  IconShieldCode,
  IconSitemap,
  IconTag,
  IconUser,
  TablerIconsProps
} from '@tabler/icons-react';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { FaNetworkWired } from 'react-icons/fa6';
import { GrCompliance } from 'react-icons/gr';
import { LuBrainCircuit } from 'react-icons/lu';
import { MdOutlinePolicy } from 'react-icons/md';
import { PiGithubLogo } from 'react-icons/pi';
import { SiKubernetes } from 'react-icons/si';
import { TbCloudLock } from 'react-icons/tb';

export const sideNavData: SideNavData = [
  {
    id: 'arch-diagrams',
    label: 'Arch Diagrams',
    icon: IconSitemap
  },
  {
    id: 'genpod',
    label: 'genPod',
    icon: IconCode,
    links: [
      {
        label: 'genPod',
        link: '/genpod'
      }
    ]
  },
  {
    id: 'genval',
    label: 'genVal',
    icon: IconAugmentedReality,
    links: [
      {
        label: 'genVal',
        link: '/genval'
      }
    ]
  },
  {
    id: 'networking',
    label: 'Networking',
    icon: IconCloudComputing,
    links: [
      {
        label: 'Networking',
        link: '/networking'
      }
    ]
  },
  {
    id: 'k8s-lac',
    label: 'K8s (lac)',
    // @ts-expect-error SiKubernetes is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: SiKubernetes,
    links: [
      {
        label: 'K8s (lac)',
        link: '/k8s'
      }
    ]
  },
  {
    id: 'ci-tekton',
    label: 'CI (Tekton)',
    // @ts-expect-error IconCode is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: PiGithubLogo,
    links: [
      {
        label: 'CI (Tekton)',
        link: '/ci'
      }
    ]
  },
  {
    id: 'cd-git-ops',
    label: 'CD (GitOps)',
    icon: IconBrandGit,
    links: [
      {
        label: 'CD (GitOps)',
        link: '/cd'
      }
    ]
  },
  {
    id: 'sec-ops',
    label: 'SecOps',
    icon: IconShieldCode,
    links: [
      {
        label: 'SecOps',
        link: '/secops'
      }
    ]
  },
  {
    id: 'network-policies-lac',
    label: 'Network Policies (lac)',
    // @ts-expect-error FaNetworkWired is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: FaNetworkWired,
    links: [
      {
        label: 'Network Policies (lac)',
        link: '/network-policies'
      }
    ]
  },
  {
    id: 'security-lac',
    label: 'Security (lac)',
    icon: IconCloudLock,
    links: [
      {
        label: 'Security (lac)',
        link: '/security'
      }
    ]
  },
  {
    id: 'compliance',
    label: 'Compliance',
    // @ts-expect-error GrCompliance is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: GrCompliance,
    links: [
      {
        label: 'Compliance',
        link: '/compliance'
      }
    ]
  },
  {
    id: 'optimization-policies-lac',
    label: 'Optimization Policies (lac)',
    // @ts-expect-error MdOutlinePolicy is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: MdOutlinePolicy,
    links: [
      {
        label: 'Optimization Policies (lac)',
        link: '/optimization-policies'
      }
    ]
  },
  {
    id: 'access-control-user-management',
    label: 'Access Controls (User Management)',
    // @ts-expect-error TbCloudLock is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: TbCloudLock,
    links: [
      {
        label: 'Access Controls (User Management)',
        link: '/access-controls'
      }
    ]
  },
  {
    id: 'on-boarding',
    label: 'OnBoarding',
    // @ts-expect-error FaChalkboardTeacher is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: FaChalkboardTeacher,
    links: [
      {
        label: 'OnBoarding',
        link: '/onboarding'
      }
    ]
  },
  {
    id: 'labels',
    label: 'Labels',
    icon: IconTag,
    links: [
      {
        label: 'Labels',
        link: '/labels'
      }
    ]
  },
  {
    id: 'data-ops',
    label: 'DataOps',
    icon: IconServer2,
    links: [
      {
        label: 'DataOps',
        link: '/dataops'
      }
    ]
  },
  {
    id: 'ml-ops',
    label: 'MLOps',
    // @ts-expect-error LuBrainCircuit is from a different Icon Library which doesn't have the same props as TablerIconsProps which is Okay
    icon: LuBrainCircuit,
    links: [
      {
        label: 'MLOps',
        link: '/mlops'
      }
    ]
  }
];

export type SideNavData = {
  id: string;
  label: string;
  icon: (props: TablerIconsProps) => JSX.Element;
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}[];

// export type sideNavFooterData = {
//   id: string;
//   label: string;
//   icon: (props: TablerIconsProps) => JSX.Element;
//   initiallyOpened?: boolean;
//   links?: { label: string; link: string }[];
// }[];

export const footerLinks:SideNavData = [{
  id: 'profile',
  label: 'Profile',
  icon: IconUser,
  links: [
    {
      label: 'Projects',
      link: '/projects'
    }
  ]
}] ;
