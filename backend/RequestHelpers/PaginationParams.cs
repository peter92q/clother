namespace API.RequestHelpers
{
    public class PaginationParams
    {
        private const int maxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 8;

        public int PageSize
        {
            get => _pageSize;
            //user cannot request more than 50 products, if he does we just return 50
            set => _pageSize = value > maxPageSize ? maxPageSize : value;
        }
    }
}