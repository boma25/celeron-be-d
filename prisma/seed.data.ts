import { EAdminType, EVisibilityStatus, Prisma } from '@prisma/client';

export const superAdminSeedData: Prisma.AdminCreateInput = {
  email: 'admin@admin.com',
  adminType: EAdminType.SUPER_ADMIN,
  password: '$2b$10$Umk.oeeVHPQwly53FRsAXe/hW2ugfqoypSaO6hefxKd05Jr49i6Zq',
  firstName: 'Boma',
  lastName: 'Amakiri',
};

export const blogsSeedData: Prisma.BlogCreateManyInput[] = [
  {
    coverImage: 'https://picsum.photos/200/300',
    title:
      'Nigerian firm promises revolutionary solar-powered cars for African market',
    content:
      'Varius sem semper at felis sit dignissim sagittis id rhoncus. Arcu, amet sollicitudin ultricies faucibus rutrum. Enim tellus turpis suscipit euismod. Quis arcu nibh ipsum sem. Mollis quis convallis volutpat ut viverra consectetur lacinia placerat. Est, vel, quis proin faucibus adipiscing vel netus. Dictumst sociis arcu leo, egestas sit dictum ut nisi. Sollicitudin proin aliquam viverra dignissim tempus curabitur enim id ipsum. Ut ultrices quis vel elit. Ac ultricies neque sed mollis leo, sit faucibus consectetur. Turpis scelerisque maecenas sed nisl amet vel. Vitae et malesuada id potenti interdum risus tristique pharetra. Nam lectus nunc lectus accumsan. Sed odio nec, faucibus tellus. Lobortis suspendisse tellus bibendum parturient amet aliquam gravida vitae. Ipsum, viverra nulla tincidunt aliquam tortor, et, risus. Nibh morbi faucibus pellentesque duis eu aliquet egestas felis pretium. Diam, a dolor habitasse viverra nibh vitae nisl porta nec. Porttitor urna nibh purus risus et euismod tempor. In amet quam sed magna tincidunt tempus sed. Est pretium amet, feugiat aliquet tellus euismod urna. Varius euismod ornare nunc pulvinar parturient aliquam in viverra. Scelerisque non faucibus tortor, ut nec. Enim aliquam ornare fringilla neque, ut. Parturient tincidunt ut viverra nisl velit justo. Pharetra augue lacus, libero vel morbi et, habitasse. Diam mauris dui quam ac. Neque varius auctor eu orci venenatis viverra vel scelerisque vitae. Augue blandit id suscipit scelerisque vel elementum. Tristique sed vestibulum pellentesque sapien in sed. Etiam facilisi pellentesque mauris, dapibus orci enim. Lobortis ut urna vitae sit feugiat ac eget.',
    status: EVisibilityStatus.LIVE,
  },
  {
    coverImage: 'https://picsum.photos/200/301',
    title: 'Solar vehicle maker to open Nigerian factory',
    content:
      'Varius sem semper at felis sit dignissim sagittis id rhoncus. Arcu, amet sollicitudin ultricies faucibus rutrum. Enim tellus turpis suscipit euismod. Quis arcu nibh ipsum sem. Mollis quis convallis volutpat ut viverra consectetur lacinia placerat. Est, vel, quis proin faucibus adipiscing vel netus. Dictumst sociis arcu leo, egestas sit dictum ut nisi. Sollicitudin proin aliquam viverra dignissim tempus curabitur enim id ipsum. Ut ultrices quis vel elit. Ac ultricies neque sed mollis leo, sit faucibus consectetur. Turpis scelerisque maecenas sed nisl amet vel. Vitae et malesuada id potenti interdum risus tristique pharetra. Nam lectus nunc lectus accumsan. Sed odio nec, faucibus tellus. Lobortis suspendisse tellus bibendum parturient amet aliquam gravida vitae. Ipsum, viverra nulla tincidunt aliquam tortor, et, risus. Nibh morbi faucibus pellentesque duis eu aliquet egestas felis pretium. Diam, a dolor habitasse viverra nibh vitae nisl porta nec. Porttitor urna nibh purus risus et euismod tempor. In amet quam sed magna tincidunt tempus sed. Est pretium amet, feugiat aliquet tellus euismod urna. Varius euismod ornare nunc pulvinar parturient aliquam in viverra. Scelerisque non faucibus tortor, ut nec. Enim aliquam ornare fringilla neque, ut. Parturient tincidunt ut viverra nisl velit justo. Pharetra augue lacus, libero vel morbi et, habitasse. Diam mauris dui quam ac. Neque varius auctor eu orci venenatis viverra vel scelerisque vitae. Augue blandit id suscipit scelerisque vel elementum. Tristique sed vestibulum pellentesque sapien in sed. Etiam facilisi pellentesque mauris, dapibus orci enim. Lobortis ut urna vitae sit feugiat ac eget',
    status: EVisibilityStatus.LIVE,
  },
];

export const productsSeedData = [
  {
    name: 'shoe red',
    colors: ['red'],
    sizes: ['M'],
    quantity: 10,
    price: 5000,
    status: EVisibilityStatus.LIVE,
    achieved: false,
    medias: [
      {
        mediaType: 'IMAGE',
        media_url: 'https://picsum.photos/200/303',
      },
    ],
  },
  {
    name: 'shoe black',
    colors: ['red'],
    sizes: ['M'],
    quantity: 10,
    price: 5000,
    status: EVisibilityStatus.LIVE,
    achieved: false,
    medias: [
      {
        mediaType: 'IMAGE',
        media_url: 'https://picsum.photos/200/304',
      },
    ],
  },
  {
    name: 'shoe pink',
    colors: ['red'],
    sizes: ['M'],
    quantity: 10,
    price: 5000,
    status: EVisibilityStatus.LIVE,
    achieved: false,
    medias: [
      {
        mediaType: 'IMAGE',
        media_url: 'https://picsum.photos/200/305',
      },
    ],
  },
  {
    name: 'shoe white',
    colors: ['red'],
    sizes: ['M'],
    quantity: 10,
    price: 5000,
    status: EVisibilityStatus.LIVE,
    achieved: false,
    medias: [
      {
        mediaType: 'IMAGE',
        media_url: 'https://picsum.photos/200/306',
      },
    ],
  },
];

export const userSeedData: Prisma.UserCreateInput = {
  email: 'randrul25@gmail.com',
  password: '$2b$10$1p9QlkR.DNMjoPq3RK1nV.UgGHmkOtoReDNFA18Nl7ViYs9gZU.kW',
  firstName: 'Boma',
  lastName: 'Amakiri',
  phoneNumber: '08123456789',
  emailVerified: true,
  phoneNumberVerified: true,
};
