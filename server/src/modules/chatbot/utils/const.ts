const chatbotData = {
  hi: 'Chào bạn! Tôi có thể giúp gì?',
  ship: 'Có, shop hỗ trợ ship COD toàn quốc.',
  time: 'Thời gian giao hàng từ 2-5 ngày tùy khu vực.',
  policy: 'Bạn có thể đổi trả trong 7 ngày.',
}

export const getResponse = (message) => {
  return chatbotData[message] || 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn.'
}
