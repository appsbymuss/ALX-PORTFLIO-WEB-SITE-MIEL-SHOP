function paginate(totalCount, currentPage, perPage) {
    const totalPages = Math.ceil(totalCount / perPage);
    return {
      total: totalCount,
      totalPages,
      currentPage,
      hasNextPage: currentPage < totalPages,
      hasPreviousPage: currentPage > 1,
    };
  }

module.exports = paginate;