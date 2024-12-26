export const SampleData = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "Naman Singh",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },
  {
    avatar: [
      "https://th.bing.com/th/id/OIP.UnzU5GInhdEv3wEUTCj-2QAAAA?rs=1&pid=ImgDetMain",
      "https://www.w3schools.com/howto/img_avatar.png",
      "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BB1pIZ5p.img?w=768&h=512&m=6&x=825&y=127&s=120&d=120",
    ],
    name: "Naman Singh",
    _id: "2",
    groupChat: false,
    members: ["1", "2"],
  },
];

export const SampleUsers = [
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "Naman Singh",
    _id: "1",
  },
  {
    avatar: "https://www.w3schools.com/howto/img_avatar.png",
    name: "Naman Singh",
    _id: "2",
  },
];

export const SampleNotifications = [
  {
    sender: {
      name: "Naman Singh",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    },
    _id: "1",
  },
  {
    sender: {
      name: "Naman Singhn",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
    },
    _id: "2",
  },
];

export const sampleMessage = [
  {
    attachments: [
      
    ],
    content: "Lauda Ka Sarkar",
    _id: "sfnsdjkfsdnfkjsbnd",
    sender: {
      _id: "user._id",
      name: "Chaman ",
    },
    chat: "chatId",
    createdAt: "2024-07-12T14:22:33.630+05:30",
  },
  {
    attachments: [
      {
        public_id: "asdsad 2",
        url: "https://www.w3schools.com/howto/img_avatar.png",
      },
    ],
    _id: "sfnsdjkfsddnfkjsbnd",
    sender: {
      _id: "aman",
      name: "Chaman 2",
    },
    chat: "chatId",
    createdAt: "2024-07-12T14:22:33.630+05:30",
  },
];

export const dashboardData = {
  users: [
    {
      name: "John Doe",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "1",
      username: "john_doe",
      friends: 20,
      groups: 5,
    },
    {
      name: "John Boi",
      avatar: "https://www.w3schools.com/howto/img_avatar.png",
      _id: "2",
      username: "john_boi",
      friends: 20,
      groups: 25,
    },
  ],

  chats: [
    {
      name: "LabadBass Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "1",
      groupChat: false,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Doe",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
    {
      name: "LauDa Lusson Group",
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      _id: "2",
      groupChat: true,
      members: [
        { _id: "1", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
        { _id: "2", avatar: "https://www.w3schools.com/howto/img_avatar.png" },
      ],
      totalMembers: 2,
      totalMessages: 20,
      creator: {
        name: "John Boi",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],

  messages: [
    {
      attachments: [],
      content: "L*uda ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman ",
      },
      chat: "chatId",
      groupChat: false,
      createdAt: "2024-02-12T10:41:30.630Z",
    },

    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "",
      _id: "sfnsdjkfsdnfkdddjsbnd",
      sender: {
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
        name: "Chaman  2",
      },
      chat: "chatId",
      groupChat: true,
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ],
};