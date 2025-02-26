const chatbotData = {
  'Xin chào': 'Chào bạn! Tôi có thể giúp gì?',
  'Shop có ship COD không?': 'Có, shop hỗ trợ ship COD toàn quốc.',
  'Thời gian giao hàng bao lâu?':
    'Thời gian giao hàng từ 2-5 ngày tùy khu vực.',
  'Chính sách đổi trả thế nào?':
    'Bạn có thể đổi trả trong 7 ngày nếu sản phẩm lỗi hoặc không đúng mô tả.',
}

export const getResponse = (message) => {
  return chatbotData[message] || 'Xin lỗi, tôi chưa hiểu câu hỏi của bạn.'
}
